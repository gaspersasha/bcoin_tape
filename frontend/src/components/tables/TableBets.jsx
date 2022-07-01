import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { betsNames } from '../roulette/betsNames';
import { appConfig } from '@config';
import { addBetsToTable } from '@dom';
import { getBetsGlobal } from '@utils';

export const TableBets = ({ isActive }) => {

  const { status } = useSelector(state => state.game);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (isActive) {
      addBetsToTable(getBetsGlobal());
    }
  }, [isActive]);

  if (!isActive) return <></>; 

  const userBets = [];

  // loops backward 
  for (let i = user.bets.length - 1; i >= 0; i--) {
    userBets.push(
      <tr className="own" key={uuidv4()}>
        <td className="amount">&#9830;{` ${user.bets[i].bet}`}</td>
        <td className="player">{user.data.name}</td>
        <td className="field">{betsNames[user.bets[i].field]}</td>
      </tr>
    );
  }

  return (
    <div className="table">
      {/* todo maybe put as anothwr component ? */}
      {(status === appConfig.GAME_SPIN_STATUS 
      || status === appConfig.GAME_CALC_STATUS) && (
        <div className="block info">
          <p>Bets are not accepted now</p>
          <p>The roulette wheel is already spinning</p>
        </div>
      )}
      {status === appConfig.GAME_PROGRESS_STATUS && (
        <table className="table-bets">
           <thead>
            <tr className="head">
              <th className="amount">Bet</th>
              <th className="player">Player</th>
              <th className="field">Field</th>
            </tr>
          </thead>
          <tbody id="tableUserBets">
            {userBets}
          </tbody>
          <tbody id="tableAllBets">

          </tbody>
        </table>
      )}
        {/* <div className="block">
          Ставок слшком много, <br/>показаны последние 123 ставок <a href="/allbets"> see all bets --></a>
        </div> */}
    </div>
  )
};

export default TableBets;
