
import { getRandomIntFrom } from '../utils/generate.js';
import * as betsSchema from '../data/betsSchema.js';
import appConfig from '../../appConfig.js';
// todo if bot wins than reset param in table --> gameIndex

export const strategyNames = ['binaryStrategy', 'ternaryStratedy', 'splitStrategy', 'cornerStrategy', 
  'lineStrategy', 'numberStratedy', 'randomStrategy', 'scaleStratedy'];

//universe function 
const getLineralStrategy = (type, variants, betMinLen, betMaxLen, reflexia = 1, initial = 100) => {
  // console.log(type + '----'+ '----'+ betMinLen + '----'+ betMaxLen);

  if ( !variants.length ) return [];
  
  const randomIndex = getRandomIntFrom(0, variants.length -1);
  const field = variants[randomIndex];
  const initialBet = initial || getRandomIntFrom(1, 10) < 9 ? appConfig.USER_MIN_BET : appConfig.USER_MIN_BET + getRandomIntFrom(9, 99);
  const betsLength = getRandomIntFrom(betMinLen, betMaxLen);

  const result = [];

  //initiate with reflexia
  for (let k = 0; k < reflexia; k++) {
    result.push({
      field: field,
      bet: initialBet
    });
  };

  for (let i = reflexia; i <= betsLength; i += reflexia) {
    let prevBet = result[i-1] ? result[i-1].bet : appConfig.USER_MAX_BET;
    if (prevBet * 2 < appConfig.USER_MAX_BET) {
      let newBet = getRandomIntFrom(1, 10) < 9 ? prevBet * 2 : (prevBet * 2) + getRandomIntFrom(1, 199);
      for (let k = 0; k < reflexia; k++) {
        newBet = getRandomIntFrom(1, 10) < 9 ? newBet : newBet + getRandomIntFrom(1, 44); // ?
        result.push(
          {
            field: field,
            bet: newBet,
          }
        );
      }
    } else {
      for (let k = 0; k < reflexia; k++) {
        const randomAddons = getRandomIntFrom(1, 800);
        let newBet = (prevBet + randomAddons) < appConfig.USER_MAX_BET ? prevBet + randomAddons : appConfig.USER_MAX_BET;
        result.push(
          {
            field: field,
            bet: newBet,
          }
        );
      }
    }
  };
  return result;
};

// all binar bets (color odd/even half)
export const binaryStrategy = () => {
  return getLineralStrategy('binary', betsSchema.binaryVariants, 4, 11, 1);
};

// all ternar bets 
export const ternaryStratedy = () => {
  return getLineralStrategy('ternary', betsSchema.ternaryVariants, 10, 22, 3);
};

export const lineStrategy = () => {
  return getLineralStrategy('line', betsSchema.lineVariants, 12, 90, 
  getRandomIntFrom(betsSchema.betsTypeRates['line'] - 1, betsSchema.betsTypeRates['line'] + 1));
};

export const cornerStrategy = () => {
  return getLineralStrategy('corner', betsSchema.cornerVariants, 20, 90,
  getRandomIntFrom(betsSchema.betsTypeRates['corner'] - 3, betsSchema.betsTypeRates['corner'] + 1));
};

export const streetStrategy = () => {
  return getLineralStrategy('street', betsSchema.streetVariants, 25, 90,
  getRandomIntFrom(betsSchema.betsTypeRates['street'] - 3, betsSchema.betsTypeRates['street'] + 1));
};

export const splitStrategy = () => {
  return getLineralStrategy('split', betsSchema.splitVariants, 30, 90,
  getRandomIntFrom(betsSchema.betsTypeRates['split'] - 4, betsSchema.betsTypeRates['split'] + 2));
};

export const numberStratedy = () => {
  return getLineralStrategy('number', betsSchema.numberVariants, 35, 90,
  getRandomIntFrom(betsSchema.betsTypeRates['number'] - 4, betsSchema.betsTypeRates['number'] + 1));
};

export const scaleStratedy = () => {

  const aim = betsSchema.numberVariants[getRandomIntFrom(0, betsSchema.numberVariants.length -1)];
  const aimSpace = betsSchema.betsToWin[aim];

  let result = [];

  //binary 
  let options = []; 
  aimSpace.forEach(val => {
    betsSchema.binaryVariants.includes(val) && options.push(val);
  });
  result = result.concat(getLineralStrategy('binary', options, 5, 5, 2));
  
  //ternary 
  options = []; 
  aimSpace.forEach(val => {
    betsSchema.ternaryVariants.includes(val) && options.push(val);
  });
  result = result.concat(getLineralStrategy('ternary', options, 5, 8, 3, 400));

  //line
  options = []; 
  aimSpace.forEach(val => {
    betsSchema.lineVariants.includes(val) && options.push(val);
  });
  result = result.concat(getLineralStrategy('line', options, 5, 10, 5, 800));

  //corner
  options = []; 
  aimSpace.forEach(val => {
    betsSchema.cornerVariants.includes(val) && options.push(val);
  });
  result = result.concat(getLineralStrategy('corner', options, 5, 10, 5, 1000));

  //street
  options = []; 
  aimSpace.forEach(val => {
    betsSchema.streetVariants.includes(val) && options.push(val);
  });
  result = result.concat(getLineralStrategy('street', options, 5, 10, 5, 2000));

  //split
  options = []; 
  aimSpace.forEach(val => {
    betsSchema.splitVariants.includes(val) && options.push(val);
  });
  result = result.concat(getLineralStrategy('split', options, 3, 7, 8, 2000));

  //number
  options = []; 
  aimSpace.forEach(val => {
    betsSchema.numberVariants.includes(val) && options.push(val);
  });

  result = result.concat(getLineralStrategy('number', options, 10, 20, 6, 2000));
  return result;
};


export const randomStrategy = () => {
  let result = [];

  //binary 
  result = result.concat(getLineralStrategy('binary', betsSchema.binaryVariants, 4, 5, 2));
  
  //ternary 
  result = result.concat(getLineralStrategy('ternary', betsSchema.ternaryVariants, 7, 8, 3, 250));

  //line
  result = result.concat(getLineralStrategy('line', betsSchema.lineVariants, 5, 12, 4, 500));

  //corner
  result = result.concat(getLineralStrategy('corner', betsSchema.cornerVariants, 5, 12, 5, 900));

  //street
  result = result.concat(getLineralStrategy('street', betsSchema.streetVariants, 5, 12, 6, 1600));

  //split
  result = result.concat(getLineralStrategy('split', betsSchema.splitVariants, 5, 12, 7, 2200));

  //number
  result = result.concat(getLineralStrategy('number', betsSchema.numberVariants, 5, 12, 8, 1800));

  return result;
};

const strategyObject = {
  binaryStrategy,
  ternaryStratedy,
  splitStrategy,
  cornerStrategy,
  lineStrategy,
  numberStratedy,
  randomStrategy,
  scaleStratedy,
};

export const generateRandomStrategy = () => {
  const strategyIndex = getRandomIntFrom(0, strategyNames.length - 1);
  return {
    strategyName: strategyNames[strategyIndex],
    strategy: strategyObject[strategyNames[strategyIndex]](),
  }
};
