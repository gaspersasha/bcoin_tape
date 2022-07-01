import fs from 'fs';
import { checkNameString } from '../../utils/validation.js';
import { shuffleArray } from '../../utils/math.js';

try {  

  const data = fs.readFileSync(process.cwd() + '/backend/scripts/parse_bots/users.txt', 'utf8');
  const allNames = data.toString().split(',');  
  console.log('all names length ==>', allNames.length);
  const parsedNames = [];

  allNames.forEach(val => {
    if (checkNameString(val)) {
      parsedNames.push(val);
    }
  });

  console.log('parsed names length ==>', parsedNames.length);

  const parsedNamesShuffeled = shuffleArray(shuffleArray(parsedNames));

  const lengthAll = parsedNamesShuffeled.length;
  const length3d = Math.round(lengthAll / 2.5);
  const lengthForDay = Math.round(length3d / 7);

  console.log(length3d);

  const actUsersAll = parsedNamesShuffeled.slice(0, length3d);
  const randomUsersOther = parsedNamesShuffeled.slice(actUsersAll.length);

  const days = ['Mon', 'T', 'W', 'T' , 'F', 'SA', 'Su'];

  const seperator = '$&$&$&$&$&$&$&$&$&$&$&$&$&$&$&$$&$&$&$&$&$&$&';
  let actUsersStr = '';

  for (let i = 0; i < days.length; i++ ) {
    actUsersStr += actUsersAll.slice(lengthForDay * i, lengthForDay * (i+1)).join() + seperator;
  }

  
  const finalResult = actUsersStr + randomUsersOther.join();

  fs.writeFileSync(process.cwd() + '/backend/scripts/parse_bots/users_parsed.txt', finalResult);

} catch(e) {
  console.log('Error:', e.stack);
}
