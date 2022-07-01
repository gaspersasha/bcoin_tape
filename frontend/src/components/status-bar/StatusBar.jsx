import React from 'react';
import { useSelector } from 'react-redux';
import { appConfig } from '@config';
import { betsNumbersColors } from '../roulette/betsNumbers';
import { Timer } from './Timer.jsx';


export const StatusBar = () => {

  const { status, lastGameResult, id } = useSelector(state => state.game);
  const lastGameId = id - 1;

  return (
    <div className="status-bar">
      <div className="status-bar-title">
        {status === appConfig.GAME_PROGRESS_STATUS && (
          <p>
              {lastGameResult && betsNumbersColors[lastGameResult] && (
                <>
                  Last time was&nbsp;
                  <a href={`/game/${lastGameId}`}>
                    <span className={`status-bar-result num-color-${betsNumbersColors[lastGameResult].color}`}>
                      {betsNumbersColors[lastGameResult].sign}
                    </span>
                  </a>
                  ,&nbsp;
                </>
              )}           
            next spin will be in
          </p>
        )}

        {status === appConfig.GAME_SPIN_STATUS && (
          <p>The croupier threw the ball, the roulette is spinning...</p>
        )}

        {status === appConfig.GAME_CALC_STATUS && (
          <p>Last time was&nbsp;
          <a href={`/game/${lastGameId}`}>
            {lastGameResult && betsNumbersColors[lastGameResult] && (
              <span className={`status-bar-result num-color-${betsNumbersColors[lastGameResult].color}`}>
                {betsNumbersColors[lastGameResult].sign}
              </span>
            )}
          </a>
        , results are calculating...
        </p>
        )}  
          
      </div>
      <Timer />
     
    </div>
  )
};

export default StatusBar;


// to check https://codepen.io/search/pens?q=countdown