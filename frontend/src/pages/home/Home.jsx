import React, { useEffect } from 'react';
import {
  GameSocket,
  StatusBar,
  Roulette,
  Desk,
  BonusHour,
  Tabs,
} from '@components';


export const Home = () => {
  return (
    <div className="page page-index">
      <GameSocket />
      <div className="section-game">
        <div className="stick-section-game">
          <StatusBar />
          <Roulette />
          <Desk />
        </div>
      </div>
      <div className="section-users">
        <BonusHour />
        <Tabs />
      </div>
    </div>
  )
};

export default Home;