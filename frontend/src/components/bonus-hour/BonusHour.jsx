import React from 'react';
import { useSelector } from 'react-redux';

export const BonusHour = () => {

  const { hourBonus } = useSelector(state => state.game);


  return (
    <div className="bonus">
       <div className="bonus-title">
        Las hour bonus went to ↓ &nbsp;&nbsp;&nbsp;<a href="/bonus">Get your bonus →</a>
      </div>
      <div className="bonus-body">

      <table>
        <tbody>
          <tr className="">
            <td className="reward" rowSpan="2">&#9733;</td>
            <td className="player">{hourBonus.firstPlace[0].name}</td>
            <td className="reward" rowSpan="2">&#9789;</td>
            <td className="player">{hourBonus.secondPlace[0].name}</td>
            <td className="reward" rowSpan="2">&#x2671;</td>
            <td className="player">{hourBonus.thirdPlace[0].name}</td>
          </tr>
          <tr className="">
            <td className="">&#9830;+300</td>
            <td className="">&#9830;+200</td>
            <td className="">&#9830;+100</td>
          </tr>
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default BonusHour;
