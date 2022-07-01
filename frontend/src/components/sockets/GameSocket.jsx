import React from 'react';
import { setWsHeartbeat } from 'ws-heartbeat/client';
import { gameActions, betsActions } from '@flow';
import { useDispatch } from 'react-redux';
import { appConfig } from '@config';


export const GameSocket = () => {

  const dispatch = useDispatch();
  

  const ws = new WebSocket('ws://localhost:5666');
  setWsHeartbeat(ws, '{"hola":"ping"}');
  
  ws.onmessage = response => {
    const parsedData = JSON.parse(response.data);
    console.log(parsedData);
    switch (parsedData.event) {
      case 'loadGame': //get all prev bets todo create apropriate action to check for curent user bets
        dispatch(gameActions.loadGame(parsedData.data.game));
        dispatch(betsActions.loadBets(parsedData.data.bets));
        break;
      case 'newBets':
        //todo update manually
        dispatch(betsActions.addBets(parsedData.data));
        break;
      case 'gameUpdate':
        //todo should it rerender ?
        //if (parsedData.data.status && parsedData.data.status === appConfig.GAME_SPIN_STATUS) window.location.reload();
        dispatch(gameActions.updateGame(parsedData.data));
        break;
  
      default: break;
    }
  };

  //to render
  return <></>
};

export default GameSocket;
