import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gameActions } from '@flow';
import { TableGame, Spinner } from '@components';
import { setRandomCallDelay } from '@utils';


export const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(false); 
  console.log(id);

  useEffect(() => {
    const fetchAPI = async () => {
      let data = await gameActions.getGameById(id);
      console.log(data);
      setRandomCallDelay(() => setGame(data));
    }
    fetchAPI(); 
  }, []);


  return (
    <div className="page page-index">
      {game ? <TableGame {...game}/> : <Spinner />}
    </div>
  );
};


export default Game;
