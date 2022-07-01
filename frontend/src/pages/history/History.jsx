import React, { useState, useEffect } from 'react';
import { gameActions } from '@flow';
import { TableHistory, Spinner } from '@components';
import { setRandomCallDelay } from '@utils';

export const History = () => {

  const [games, setGames] = useState([]); 

  useEffect(() => {
    const fetchAPI = async () => {
      let data = await gameActions.getGameHistory();
      console.log(data);
      setRandomCallDelay(() => setGames(data));
    }
    fetchAPI(); 
  }, []);


  //todo handle errors
  return (
    <div className="page page-index">
      {games.length ? <TableHistory items={games}/> : <Spinner />}
    </div>
  )
};

export default History;