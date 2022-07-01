import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler';
import colors from 'colors';
import appConfig from '../../appConfig.js';
import Game from '../models/gameModel.js';
import Bonus from '../models/bonusModel.js';
import User from '../models/userModel.js';
import { async } from 'crypto-random-string';
import { sendGameWS } from '../sockets/game/gameSocket.js';

// every hour 3+ players who spent the most of money
export const runHourBonus = asyncHandler(async () => {
  console.log('Hourly bonus started to run ');

  const lastHourGames = await Game.find({ isBonusRun : false , status: appConfig.GAME_FINISHED_STATUS });
  if (!lastHourGames.length) return;


  // get everything in 1 array
  let allGameBats = [];
  lastHourGames.forEach(val => {
    allGameBats = allGameBats.concat(val.bets);
  });

  // create statistic  
  const statistic = {}; // 
  const player_ids = {}; // 
  allGameBats.forEach(val => {
    statistic[val.name] = statistic[val.name] ? val.bet + statistic[val.name] : val.bet ;
    player_ids[val.name] = val.p_id ;
  });


  const sortable = [];
  for (const player in statistic) {
      sortable.push([player, statistic[player]]);
  }

  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });


  const firstPlace = []; // might be 2+
  const secondPlace = []; 
  const thirdPlace = []; 
  // find 3 winners
  for (let i = 0; i < sortable.length; i++ ) {
    if (!firstPlace.length) firstPlace.push(sortable.shift());
    if (firstPlace[firstPlace.length - 1][1] === sortable[0][1]) {
      firstPlace.push(sortable.shift());
    } else {
      break;
    }
  };

  for (let i = 0; i < sortable.length; i++ ) {
    if (!secondPlace.length) secondPlace.push(sortable.shift());
    if (secondPlace[secondPlace.length - 1][1] === sortable[0][1]) {
      secondPlace.push(sortable.shift());
    } else {
      break;
    }
  };

  for (let i = 0; i < sortable.length; i++ ) {
    if (!thirdPlace.length) thirdPlace.push(sortable.shift());
    if (thirdPlace[thirdPlace.length - 1][1] === sortable[0][1]) {
      thirdPlace.push(sortable.shift());
    } else {
      break;
    }
  };


  // form final object 
  const bonusToInsert = {
    firstPlace: [],
    secondPlace: [],
    thirdPlace: [],
  };

  // for real user tp pay
  const payBonusToUser = {};

  firstPlace.forEach( val => {
    bonusToInsert.firstPlace.push({
      p_id: player_ids[val[0]],
      name: val[0],
      totalBet: val[1],
      bonusAmount: appConfig.BONUS_FIRST_PLACE_AMOUNT,
    });
    payBonusToUser[val[0]] = appConfig.BONUS_FIRST_PLACE_AMOUNT;
  });

  secondPlace.forEach(val => {
    bonusToInsert.secondPlace.push({
      p_id: player_ids[val[0]],
      name: val[0],
      totalBet: val[1],
      bonusAmount: appConfig.BONUS_SECOND_PLACE_AMOUNT,
    });
    payBonusToUser[val[0]] = appConfig.BONUS_SECOND_PLACE_AMOUNT;
  });

  thirdPlace.forEach(val => {
    bonusToInsert.thirdPlace.push({
      p_id: player_ids[val[0]],
      name: val[0],
      totalBet: val[1],
      bonusAmount: appConfig.BONUS_THIRD_PLACE_AMOUNT,
    });
    payBonusToUser[val[0]] = appConfig.BONUS_THIRD_PLACE_AMOUNT;
  });

  //send lastGameWinners
  sendGameWS({ hourBonus: bonusToInsert });

  await Bonus.create(bonusToInsert);


  Object.keys(payBonusToUser).forEach(async val => {
    const user = await User.findOne({ name: val });
    if (user) {
      user.balance = user.balance + payBonusToUser[val]
      await user.save()
    }
  });

  // update game not to run bonus again
  await Game.updateMany(
    { isBonusRun : false , status: appConfig.GAME_FINISHED_STATUS },
    { isBonusRun : true }
  );



    


  //console.log('All previous calculations done... Num was 9'.bold.red);
  console.log('Hour bonus just updated'.underline.blue);

});
