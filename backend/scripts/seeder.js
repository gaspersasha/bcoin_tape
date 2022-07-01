  
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import User from '../models/userModel.js';
import Game from '../models/gamesModel.js';

import users from '../data/users.js';
import getGame from '../data/games.js';

import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Game.deleteMany();

    
    const usersCreated = await User.insertMany(users);

    const AlexId = usersCreated[0]._id;
    const DariaId = usersCreated[1]._id;
    const MishaId = usersCreated[2]._id;
    const KasperId = usersCreated[3]._id;


    
    const GameCreated = await Game.insertMany(getGame({
      AlexId,
      DariaId,
      MishaId,
      KasperId,
    }));

    // users[0].games = [GameCreated[3]._id, GameCreated[2]._id, GameCreated[1]._id, GameCreated[0]._id];
    // users[1].games = [GameCreated[3]._id, GameCreated[2]._id, GameCreated[1]._id, GameCreated[0]._id];
    // users[2].games = [GameCreated[3]._id, GameCreated[2]._id, GameCreated[0]._id];
    // users[3].games = [GameCreated[3]._id, GameCreated[0]._id];

    console.log('Data imported'.green.inverse);
    process.exit();

  } catch (error) {

    console.error(`${error}`.red.inverse);
    process.exit(1);

  };

}

  const destroyData = async () => {
    try {
      await User.deleteMany();
      await Game.deleteMany();
  
      console.log('Data Destroyed!'.red.inverse)
      process.exit();
    } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1);
    }
  };

if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  };



