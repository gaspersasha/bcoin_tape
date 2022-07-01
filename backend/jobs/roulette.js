import asyncHandler from 'express-async-handler';
import colors from 'colors';
import appConfig from '../../appConfig.js';
import * as betsSchema from '../data/betsSchema.js';
import * as botsStrategy from '../algorithms/botsStrategy.js';
import { getRandomIntFrom } from '../utils/generate.js';
import Game from '../models/gameModel.js';
import User from '../models/userModel.js';
import Bot from '../models/botModel.js';
import { sendGameWS } from '../sockets/game/gameSocket.js';


export const runRoulette = asyncHandler(async () => {

  //setstatus finished to previous
  const currentGame = await Game.findOne().sort({ g_id: -1 });

  //if (currentGame.result === appConfig.GAME_INIT_RESULT) return; // still calculating ??


  if (currentGame) {
    currentGame.status = appConfig.GAME_FINISHED_STATUS;
    await currentGame.save();
    console.log('set status finished'.italic.bold.yellow.bgBlue);
  }

  const newG_id = currentGame && currentGame.g_id  ? currentGame.g_id + 1 : 999999 ;
  Game.create({
    g_id: newG_id,
    result: appConfig.GAME_INIT_RESULT,
    status: appConfig.GAME_PROGRESS_STATUS,
    bets: [],
  });

  //send prev result + new game to socket 
  sendGameWS({
    id: newG_id,
    status: appConfig.GAME_PROGRESS_STATUS,
    startAt: new Date().getTime(),
    lastGameResult: currentGame.result,
  });
  
  console.log('New roulette game created..set status init.'.underline.bgMagenta);

  setTimeout(
    calcRoulette,
    appConfig.ROULETTE_CALC_TIMEOUT_MS,
  );
});


//script to import bots bets to game table (2-10 every second)
export const calcRoulette = asyncHandler(async () => {
  console.log('set status spining'.italic.bold.red);

  sendGameWS({
    status: appConfig.GAME_SPIN_STATUS,
  });

  //last game
  const currentGame = await Game.findOne().sort({ g_id: -1 });
  if (currentGame.result !== appConfig.GAME_INIT_RESULT) return;

  currentGame.status = appConfig.GAME_CALC_STATUS;
  await currentGame.save();

  //random variants to check
  const winnerVariants = [];
  while (winnerVariants.length <= appConfig.GAME_WIN_VARIANS_AMOUNT) {
    const randomIndex = getRandomIntFrom(0, betsSchema.numberVariants.length -1);
    const randomWinner = betsSchema.numberVariants[randomIndex];
    if (!winnerVariants.includes(randomWinner)) winnerVariants.push(randomWinner);
  }

  const usersGain = {};
  let winnerBet = '', smallestGain = 9999999999999;
  winnerVariants.forEach(variant => {
    let totalAmount = 0;
    //todo add logic on amount real users is playing to make all happy at all 
    currentGame.bets.forEach(val => {
      if (betsSchema.betsToWin[variant].includes(val.field)) {
        totalAmount += val.bet * betsSchema.betsRatesX[val.field];
      };
    });

    if (totalAmount < smallestGain) {
      winnerBet = variant;
      smallestGain = totalAmount;
    }
    usersGain[variant] = totalAmount;
  });

  // add bets to game with winners
  const gameResult = [];
  const lastGameWinners = [];
  currentGame.bets.forEach(val => {
    gameResult.push({ 
      p_id:val.p_id,
      name: val.name,
      field: val.field,
      bet: val.bet,
      gain: betsSchema.betsToWin[winnerBet].includes(val.field) ? val.bet * betsSchema.betsRatesX[val.field] : 0,
      isBot: val. isBot,
    });
    if (betsSchema.betsToWin[winnerBet].includes(val.field)) {
      lastGameWinners.push({
        name: val.name,
        gain: val.bet * betsSchema.betsRatesX[val.field],
      });
    }
  });

  //send lastGameWinners
  sendGameWS({lastGameWinners});

  currentGame.result = winnerBet;
  currentGame.bets = gameResult;
  currentGame.save();
  
  const botsIdsGain = [];
  // update users wallets 
  gameResult.forEach(async val => {
    if (!val.isBot && val.gain > 0) {
      const winner = await User.findById(val.p_id);
      if (winner) {
        winner.balance = winner.balance + val.gain;
        await winner.save();
      }
    }
    if (val.isBot && val.gain > 0) {
      botsIdsGain.push(val.p_id);
    }
  });

  console.log('botsIdsGain --==>>', botsIdsGain);
  // make winner bots start to play again
  botsIdsGain.forEach(async val => {
    const winnerBot = await Bot.findById(val.p_id);
    if (winnerBot) {
      const thisrdRandom = getRandomIntFrom(1, 3);
      winnerBot.isBetMade = false;
      switch (thisrdRandom) {
        //reset index game
        case 1 :
          winnerBot.gameIndex = 0; 
          break;
        //get new random strategy
        case 2 :
          const randomStrategy = botsStrategy.generateRandomStrategy();
          winnerBot.gameIndex = 0; 
          winnerBot.strategyName = randomStrategy.strategyName; 
          winnerBot.strategy = randomStrategy.strategy; 
          break;
        // remove bot
        case 3 :
          winnerBot.gameIndex = winnerBot.strategy.length;
          break;
        default: break;
      }
      await winnerBot.save();
    }
  });

  // reset bots to play again + remove some bots (from model)
  await Bot.updateMany(
    { isBetMade: true },
    { isBetMade: false }
  );

  //status logic
  setTimeout(
    () => {
      //send calc timeout to FE
      console.log('send cal status'.red);
      sendGameWS({
        status: appConfig.GAME_CALC_STATUS,
      });
      setTimeout(
        () => {
          console.log('<==--ALL CALCULATIONS ARE FINISHED--==>'.zebra);
          runRoulette();
        },
        appConfig.ROULETTE_CALC_FE_TIMEOUT_MS,
      );
    },
    appConfig.ROULETTE_SPIN_FE_TIMEOUT_MS,
  );
});
