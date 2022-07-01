import React from 'react'
import PropTybes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { numberWith } from '@utils';
import { betsNumbersColors } from '../roulette/betsNumbers';


export const TableHistory = ({ items }) => {

  const gameAmount = items.length;
  const currentGame = items.shift();

  const tableRows = [];

  for (let i = 0 ; i < items.length; i++) {
    tableRows.push(
      <tr className="row" key={uuidv4()}>
        <td className="id"><a href={`game/${items[i].id}`}>#{items[i].id}</a></td>
        <td className="gain">&#9830; {`${numberWith(items[i].gain, ',')}`}</td>
        <td className={`result num-color-${betsNumbersColors[items[i].result].color}`}>
          {betsNumbersColors[items[i].result].sign}
        </td>
      </tr>
    );
  };

  return (
    <div className="block-history">
      <div className="gogame"><a href="/"> {`< Back to game`}</a></div>

        <div className="wrapper">
        
          <div className="resume">
            {`Last ${gameAmount} games:`}
          </div>

          <table className="table-history">
            <thead>
              <tr className="head">
                <th className="id">Game ID</th>
                <th className="gain current-game">Gain</th>
                <th className="result">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="row">
                <td className="id"><a href={`game/${currentGame.id}`}>#{currentGame.id}</a></td>
                <td className="gain" colSpan="2">Current game</td>
              </tr>
              {tableRows}
            </tbody>
          </table>
      </div>
    </div>
  )
};

TableHistory.defaultProps = {
  items: [{
    id: 666,
    gain: 10000,
    result: 'num36',
  }],
};

TableHistory.propTybes = {
  items: PropTybes.array.isRequired,
};

export default TableHistory;
