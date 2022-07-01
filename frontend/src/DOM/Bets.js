import { getBetsToDensity, numberWith } from '@utils';
import { betsNames } from '../components/roulette/betsNames';

// for new bets that apper fancy
export const addBetsToTable = (bets) => {
  const tableAllBets = document.getElementById('tableAllBets');
  if (tableAllBets) {
    const fragment = new DocumentFragment();

    for (let i = bets.length - 1; i >= 0; i--) {
      let tr = document.createElement('tr');
      tr.className = 'other';
      tr.innerHTML = "<td class='amount'>&#9830;" + bets[i].bet + "</td>" +
      "<td class='player'>" + bets[i].name + "</td>" +
      "<td className='field'>" + betsNames[bets[i].field] + "</td>";

      fragment.appendChild(tr);
    }

    tableAllBets.prepend(fragment);
  }
}

export const clearBetsTable = () => {
  const tableUserBets = document.getElementById('tableUserBets');
  if (tableUserBets) {
    tableUserBets.innerHTML = '';
  }
  const tableAllBets = document.getElementById('tableAllBets');
  if (tableAllBets) {
    tableAllBets.innerHTML = '';
  }
};

export const updateBetsCounter = (amount) => {
  const totalBetsAmount = document.getElementById('totalBetsAmount');
  if (totalBetsAmount) {
    totalBetsAmount.innerHTML = `${amount}`;
  }
};

export const makeDencityTable = (bets) => {
  const tableDensity = document.getElementById('tableDensity');

  if (tableDensity) {
  //make array
    const density = getBetsToDensity(bets);
    var sortable = [];
    for (var field in density) {
        sortable.push({field,
        totalBets: density[field].totalBets,
        betsAmount: density[field].betsAmount
      });
    }

    const densitySorted = sortable.sort((a, b) => {
      return parseInt(b.totalBets) - parseInt(a.totalBets);
    });

    // //to display
    const fragment = new DocumentFragment();
    
    densitySorted.forEach(el => {
      let tr = document.createElement('tr');
      tr.className = 'line';

      tr.innerHTML = "<td class='amount'>&#9830;" + numberWith(el.totalBets, ',') + "</td>" +
      "<td class='bets'>" + el.betsAmount + "</td>" +
      "<td className='field'>" + betsNames[el.field] + "</td>";

      fragment.appendChild(tr);
    });

    tableDensity.innerHTML = '';
    tableDensity.prepend(fragment);
  }
  
};

export const clearDencityTable = () => {
  const tableDensity = document.getElementById('tableDensity');
  if (tableDensity) {
    tableDensity.innerHTML = '';
  }
};