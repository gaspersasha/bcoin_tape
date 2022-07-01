import React from 'react';
import { setWsHeartbeat } from 'ws-heartbeat/client';
import { timerActions } from '@flow';
import { useDispatch } from 'react-redux';
import { appConfig } from '@config';


export const TimerSocket = () => {

  const dispatch = useDispatch();
  

  const ws = new WebSocket('ws://localhost:5667');
  setWsHeartbeat(ws, '{"hola":"ping"}');

  
  ws.onmessage = response => {
    const parsedData = JSON.parse(response.data);
    console.log(parsedData);
    switch (parsedData.event) {
      case 'setTimer': //get all prev bets todo create apropriate action to check for curent user bets
        dispatch(timerActions.updateTimer(parsedData.data));
        break;
      case 'updateTimer':
        //todo should it rerender ?
        //if (parsedData.data.status && parsedData.data.status === appConfig.GAME_SPIN_STATUS) window.location.reload();
        dispatch(timerActions.updateTimer(parsedData.data));
        break;
  
      default: break;
    }
  };

  //to render
  return <></>
};

export default TimerSocket;
