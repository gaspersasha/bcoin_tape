import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { betsNames } from '../roulette/betsNames';
import { appConfig } from '@config';
import { makeDencityTable } from '@dom';
import { getBetsGlobal } from '@utils';

export const TableDensity = ({ isActive }) => {

  const { status } = useSelector(state => state.game);

  useEffect(() => {
    if (isActive) {
      makeDencityTable(getBetsGlobal());
    }
  }, [isActive]);

  if (!isActive) return <></>;

  return (
    <div className="table">
      {(status === appConfig.GAME_SPIN_STATUS 
      || status === appConfig.GAME_CALC_STATUS) && (
        <div className="block info">
          <p>Bets are not accepted now</p>
          <p>The roulette wheel is already spinning</p>
        </div>
      )}
      {status === appConfig.GAME_PROGRESS_STATUS && (
        <table className="table-dencity">
          <thead>
            <tr className="head">
              <th className="amount">Bets in Total</th>
              <th className="bets">Bets Amount</th>
              <th className="field">Field</th>
            </tr>
          </thead>
          <tbody id='tableDensity'>

          </tbody>
        </table>
      )}
    </div>
  )
};

export default TableDensity;
