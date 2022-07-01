import asyncHandler from 'express-async-handler';
import appConfig from '../../appConfig.js';
import { getRandomIntFrom } from '../utils/generate.js';
import * as botsSchema from '../data/botsSchema.js';
import * as botsStrategy from '../algorithms/botsStrategy.js';
import Game from '../models/gameModel.js';
import Bot from '../models/botModel.js';
import { sendBetsWS } from '../sockets/game/gameSocket.js';

//script to generate bots with strategy and put all to DB with bots (every 3 sec)
export const generateBots = asyncHandler(async () => {

  // check amount of both that has not made bet
  const currentBots = await Bot.find({});

  let freeBotsAmount = 0;
  let usedBotsNames = [];

  currentBots.forEach(val => {
    usedBotsNames.push(val.name);

    if (!val.isBetMade) freeBotsAmount++;
  });

  console.log('freeBotsAmount -->', freeBotsAmount);

  if (freeBotsAmount >= appConfig.KEEP_MIN_BOTS_AMOUNT_MS) return;

  // get random names and check if they are available;
  const D = new Date();
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = weekday[D.getDay()];

  const amountNeeded = appConfig.KEEP_MIN_BOTS_AMOUNT_MS - freeBotsAmount;
  const halfAmountNeeded = Math.round(amountNeeded / 2);
  
  const newBotsNames = [];

  // take active players 50%
  for (let i = 0; i <= halfAmountNeeded; i++) {
    const randomBotName = botsSchema.superActive[dayName][getRandomIntFrom(0, botsSchema.superActive[dayName].length - 1)];
    if (!usedBotsNames.includes(randomBotName) && !newBotsNames.includes(randomBotName)) {
      newBotsNames.push(randomBotName);
    }
  }

  // take simi active players 50%
  for (let i = 0; i <= halfAmountNeeded; i++) {
    const randomBotName = botsSchema.semiActive[dayName][getRandomIntFrom(0, botsSchema.semiActive[dayName].length - 1)];
    if (!usedBotsNames.includes(randomBotName) && !newBotsNames.includes(randomBotName)) {
      newBotsNames.push(randomBotName);
    }
  }

  // take from others
  for (let i = 0; i <= amountNeeded - newBotsNames.length ; i++) {
    const randomBotName = botsSchema.others[getRandomIntFrom(0, botsSchema.others.length - 1)];
    if (!usedBotsNames.includes(randomBotName) && !newBotsNames.includes(randomBotName)) {
      newBotsNames.push(randomBotName);
    }
  }

  // get strategy to every bot (create object to insert);
  const botsToInsert = [];

  newBotsNames.forEach(val => {
    const gandomStrategy = botsStrategy.generateRandomStrategy();
    botsToInsert.push({
      name: val,
      gameIndex: 0,
      isBetMade: false,
      strategyName: gandomStrategy.strategyName,
      strategy: gandomStrategy.strategy,
    });
  });

  await Bot.insertMany(botsToInsert);
  console.log('some new bots are created (๑❛ᴗ❛๑)'.america);
});


//script to import bots bets to game table (2-10 every second)
export const importBotsToGame = asyncHandler(async () => {
  console.log('++++++importBotsToGame++++++++', );
  const currentGame = await Game.findOne().sort({ g_id:-1 });

  if (currentGame.status !== appConfig.GAME_PROGRESS_STATUS) return;

  const botsAmount = getRandomIntFrom(appConfig.MIN_BOTS_PLAYING_ON_SEC, appConfig.MAX_BOTS_PLAYING_ON_SEC);
  const selectedBots = await Bot.find({ isBetMade: false }).limit(botsAmount);

  if (!selectedBots.length) return;

  const sendBetsToClient = [];

  selectedBots.forEach(val => {
    const field = val.strategy[val.gameIndex] ? val.strategy[val.gameIndex].field : val.strategy[val.strategy.length -1].field;
    const bet = val.strategy[val.gameIndex] ? val.strategy[val.gameIndex].bet : appConfig.USER_MAX_BET;
    currentGame.bets.push({
      p_id: val._id,
      name: val.name,
      field,
      bet,
      isBot: true
    });
    sendBetsToClient.push({
      name: val.name,
      field,
      bet,
    });
  });
  await currentGame.save();

  // update game socket
  sendBetsWS(sendBetsToClient);

  //update index or delete 
  selectedBots.forEach(async val => {
    if (val.gameIndex >= val.strategy.length) {
      await Bot.deleteOne({_id: val._id});
    } else {
      val.gameIndex = val.gameIndex + 1;
      val.isBetMade = true;
      await val.save();
    }
  });

  console.log('$$$$$ bots made bets $$$$$'.brightGreen.bgGrey);
});

