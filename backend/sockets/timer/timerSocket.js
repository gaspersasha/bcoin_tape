import WebSocket from 'ws';
import { setWsHeartbeat } from 'ws-heartbeat/server';
import dotenv from 'dotenv';
import appConfig from '../../../appConfig.js';

import { 
  setStartTimeStore,
  getStartTimeStore,
  clearTimeInterval,
  saveTimeInterval,
} from './timerSocketStore.js';

//config env
dotenv.config();


//run game WS server
export const runTimerWSS = () => {
  const PORT = process.env.PORT_TIMER_SOCKET || 5667 ;
  const wss = new WebSocket.Server({
    port: PORT,
  });

  setWsHeartbeat(wss, (ws, data, binary) => {
    if (data === '{"hola":"ping"}') { // send pong if recieved a ping.
        ws.send('{"hola":"pong"}');
    }
  });

  wss.on('connection', ws => {
    // send cureent game data as initialisation
    const formatData = {
      event: 'setTimer',
      data: {
        time: new Date().getTime(), // to calculate at FE
        startAt: getStartTimeStore(),
      },
    };
    ws.send(JSON.stringify(formatData));

    ws.on('message', data => {
      const parsedData = JSON.parse(data);
      //check security
      if (!parsedData[process.env.SW_SECRET_KEY]
      || parsedData[process.env.SW_SECRET_KEY] !== process.env.SW_SECRET_VALUE) {
        return;
      }
      //remove security for FE
      delete parsedData[process.env.SW_SECRET_KEY];

      // rule local store
      switch (parsedData.event) {
        case 'setTimer':
          const now = new Date().getTime();
          setStartTimeStore(now);
          parsedData.data = {
            startAt: now,
            time: now,
          };
          //setup timeInterval regular
          saveTimeInterval(setInterval(sendTimerUpdateWS, 200));
          break;
        case 'updateTimer':
          parsedData.data = {
            time: new Date().getTime(),
          };
          // stop send this
          if ((parsedData.data.time - getStartTimeStore()) > appConfig.ROULETTE_CALC_TIMEOUT_MS) {
            clearTimeInterval();
          }
          break;
        default: return;
      }

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedData));
        }
      });
    });
  });
};

export const sendStartTimerWS = () => {
  const formatData = {
    event: 'setTimer',
  };
  formatData[process.env.SW_SECRET_KEY] = process.env.SW_SECRET_VALUE;

  const ws = new WebSocket(`ws://localhost:${process.env.PORT_TIMER_SOCKET}`);
  ws.on('open', () => {
    ws.send(JSON.stringify(formatData));
    ws.close();
  });
};

export const sendTimerUpdateWS = () => {
  const formatData = {
    event: 'updateTimer',
  };
  formatData[process.env.SW_SECRET_KEY] = process.env.SW_SECRET_VALUE;

  const ws = new WebSocket(`ws://localhost:${process.env.PORT_TIMER_SOCKET}`);
  ws.on('open', () => {
    ws.send(JSON.stringify(formatData));
    ws.close();
  });
};
