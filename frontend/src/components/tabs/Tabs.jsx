import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@flow';
import { TableBets, TableDensity } from '@components';

export const Tabs = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  // const { bets } = useSelector(state => state.bets);

  const setActTab = (tab) => {
    dispatch(userActions.setActiveTab(tab));
  };

  return (
    <>
      <div className="tabs">
        <div 
          className={`tab-bets ${user.actTab === 'bets' ? 'active' : ''}`}
          onClick={() => setActTab('bets')}
        >
            <p>Bets </p>
            <p className="now">(<span id="totalBetsAmount">0</span> total)</p>
        </div>
        <div
          id="tabDensity"
          className={`tab-density ${user.actTab === 'density' ? 'active' : ''}`}
          onClick={() => setActTab('density')}
        >
            <p>Density </p>
        </div>
      <div className="tab-prev">
          <a href="/history">История игр -></a>
      </div>
    </div>
    <div className="tabs-tables">
      <TableBets isActive={user.actTab  === 'bets' ? true : false}/>
      <TableDensity isActive={user.actTab  === 'density' ? true : false}/>
    </div>
  </>
  )
};

export default Tabs;