import React from 'react'
import PropTybes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { numberWith } from '@utils';
import { appConfig } from '@config';
import { betsNames } from '../roulette/betsNames';
import { betsNumbersColors } from '../roulette/betsNumbers';

export const TableGame = ({ bets, id, status, result, gain, error }) => {

  const userName = window.userNameBT;

  const tableRowsOwn = [];
  const tableRows = [];
  let totalBet = 0;
  let totalGain = 0;

  const reloadPage = () => window.location.reload();


  bets.forEach(el => {
    totalBet += Number(el.bet);
    totalGain += Number(el.gain);
    if (el.name === userName) {
      tableRowsOwn.push(
        <tr className="own row" key={uuidv4()}>
          <td className="bet">&#9830; {el.bet}</td>
          <td className="player">{el.name}</td>
          <td className="field">{betsNames[el.field]}</td>
          <td className="gain">{el.gain}</td>
        </tr>
      );
    } else {
      tableRowsOwn.push(
        <tr className="row" key={uuidv4()}>
          <td className="bet">&#9830; {el.bet}</td>
          <td className="player">{el.name}</td>
          <td className="field">{el.field}</td>
          <td className="gain">{el.gain}</td>
        </tr>
      );
    }
  });

  return (
    <div className="block-table-game">
      <div className="gogame"><a href="/"> {`< Back to game`}</a></div>

        <div className="wrapper">

          {status === appConfig.GAME_PROGRESS_STATUS && (
            <>
              <div className="resume">
                Game id: #{id}, this game is not over yet...
              </div>
              <div className="resume">
                There are {bets.length} bets in total sume  &#9830;{totalBet} now
              </div>
              <div className="actions">
                <div className="reload"><button onClick={reloadPage}>🔄 Reload</button></div>
              </div>
            </>
          )}

          {status !== appConfig.GAME_PROGRESS_STATUS && (
            <>
              <div className="resume">
                Game id: #{id}
              </div>
              <div className="resume">
                Result:&nbsp;
                <span className={`result num-color-${betsNumbersColors[result].color}`}>
                  {betsNumbersColors[result].sign}
                </span>
              </div>
            </>
          )}
        
        <table className="table-game">
            <thead>
              <tr className="head">
                <th className="amount">Bet</th>
                <th className="player">Player</th>
                <th className="field">Field</th>
                <th className="gain">Gain</th>
              </tr>
            </thead>
            <tbody>
              {tableRowsOwn}
              {tableRows}
            </tbody>
            <tfoot>
              <tr className="footer">
                <td className="bet">&#9830; {numberWith(totalBet, ',')}</td>
                <td className="all" colSpan="2">ALL</td>
                <td className="gain">&#9830; {numberWith(totalGain, ',')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
    </div>
  )
};


TableGame.propTybes = {
  items: PropTybes.array.isRequired,
  id: PropTybes.string,
  isCurrentGame: PropTybes.bool,
  gain: PropTybes.string,
  totalBet: PropTybes.string,
  error: PropTybes.string,
};

export default TableGame;
