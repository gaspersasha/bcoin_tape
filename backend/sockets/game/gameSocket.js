import WebSocket from 'ws';
import { setWsHeartbeat } from 'ws-heartbeat/server';
import dotenv from 'dotenv';

import { 
  setGameStore,
  getGameStore,
  addBetStore,
  getBetsStore,
  clearBetsStore,
} from './gameSocketStore.js';

//config env
dotenv.config();

//run game WS server
export const runGameWSS = () => {
  const PORT = process.env.PORT_GAME_SOCKET || 5666 ;
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
    const currentBets = getBetsStore();
    const formatData = {
      event: 'loadGame',
      data: {
        game: {
          ...getGameStore(),
          time: new Date().getTime(),
        },
        bets: currentBets,        
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
        case 'newBets':
          parsedData.data.forEach(el => {
            addBetStore(el);
          });
          break;
        case 'gameUpdate':
          //new game was created so clean the bots and reset timeout
          if (parsedData.data.id && parsedData.data.id !== getGameStore().id) {
            clearBetsStore();
            parsedData.data.time = new Date().getTime(); // for countdown
          }
          setGameStore(parsedData.data);
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

export const sendBetsWS = data => {
  const formatData = {
    event: 'newBets',
    data
  };
  formatData[process.env.SW_SECRET_KEY] = process.env.SW_SECRET_VALUE;

  const ws = new WebSocket(`ws://localhost:${process.env.PORT_GAME_SOCKET}`);
  ws.on('open', () => {
    ws.send(JSON.stringify(formatData));
    ws.close();
  });
};

export const sendGameWS = data => {
  const formatData = {
    event: 'gameUpdate',
    data
  };
  formatData[process.env.SW_SECRET_KEY] = process.env.SW_SECRET_VALUE;

  const ws = new WebSocket(`ws://localhost:${process.env.PORT_GAME_SOCKET}`);
  ws.on('open', () => {
    ws.send(JSON.stringify(formatData));
    ws.close();
  });
};

