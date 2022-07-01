import colors from 'colors';
import dotenv from 'dotenv';
import { dynamic } from 'set-interval-async'
import appConfig from '../appConfig.js';
import connectDB from './config/db.js';

import { generateBots, importBotsToGame } from './jobs/botsToBets.js';
import { runHourBonus } from './jobs/hourBonus.js';
import { runRoulette, calcRoulette } from './jobs/roulette.js';

import WebSocket from 'ws';

import { runGameWSS } from './sockets/game/gameSocket.js' 
import { runTimerWSS } from './sockets/timer/timerSocket.js' 

//config
dotenv.config();
connectDB();

// run game webscoket
runGameWSS();
// run timer webscoket ??
//runTimerWSS();
//todo think about microservises arch

calcRoulette();
runRoulette();
generateBots();
// to prevent restart
runHourBonus();

const { setIntervalAsync: setIntervalAsyncD } = dynamic;
//JOBs
//bots
setIntervalAsyncD(generateBots, appConfig.GENERATE_BOTS_TIMEOUT_MS);
setIntervalAsyncD(importBotsToGame, appConfig.IMPORT_BOTS_TIMEOUT_MS);
//bonus hour ++++++++
setIntervalAsyncD(runHourBonus, appConfig.RUN_BONUS_TIMEOUT_MS);
//game every 3 minutes (2.5 min to make bet + 0.5 min to calculate)
//setIntervalAsyncD(runRoulette, appConfig.RUN_ROULETTE_TIMEOUT_MS);
