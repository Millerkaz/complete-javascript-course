'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//console.log(Object.entries(restaurant));

/*
let menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortumund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akangi',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th,2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...members) {
    for (let x of members) {
      console.log(x);
    }
  },
};

/*Challenge-1
//1.
const [player1, player2] = game.players;

//2.
const [gk, ...fieldPlayers] = player1;
//console.log(player1, player2, gk, fieldPlayers);

//3.
const allPlayers = [...player1, ...player2];
//console.log(allPlayers);

//4.
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
//console.log(players1Final);

//5.
//const { team1, x: draw, team2 } = game.odds;
const {
  odds: { team1, x: draw, team2 },
} = game;
//console.log(team1, draw, team2);

//7.
team1 < team2 && console.log('Team1 more likely to win !');
team1 > team2 && console.log('Team2 more likely to win !');
*/

/*Challenge-2
//Q1
let scoresArray = game.scored.entries();
for (let [x, name] of scoresArray) {
  console.log(`Goal${x + 1} : ${name}`);
}

//Q2
//console.log(Object.values(game.odds));
let odds = Object.values(game.odds);
let sum = 0;
for (let i of odds) {
  sum += i;
}
console.log(`Average odds : ${sum / odds.length}`);

//Q3
// ? trash
let numbers = ['team1', 'team2'];
for (let j of numbers) {
  let team = game[j];
  let odd = game.odds[j];
  console.log(`Odd of victory ${team} : ${odd}`);
}
console.log(`Odd of draw : 3.25`);

// ? better
for (let [team,odd] of Object.entries(game.odds)){
  let teamStr = team==="X" ? "draw" : `victory ${team}`;
  console.log(`Odd of ${teamStr} : ${odd}`);
}

//Bonus
let scorers = {};
for (let name of game.scored) {
  // ? trash
  let nameKeys = Object.keys(scorers);
  nameKeys.includes(name) ? (scorers[name] += 1) : (scorers[name] = 1);
  
  // ? better : 直接判斷OBJ內的key存在與否
  scorers[name] ? (scorers[name] += 1) : (scorers[name] = 1);
  
}
console.log(scorers);
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/* Challenge-3
//Q1
//console.log([...gameEvents.values()]);
let events = new Set([...gameEvents.values()]);
//console.log(events);

//Q2
gameEvents.delete(64);

//Q3
console.log(
  `An event happened , on average , every ${90 / gameEvents.size} minutes.`
);

//Q4
for (let [min, e] of gameEvents.entries()) {
  console.log(`[${min < 45 ? 'FIRST HALF' : 'SECOND HALF'}] ${min} : ${e}`);
}
*/

/*Challenge-4

let input = `
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
`

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let textareaEl = document.querySelector('textarea');
let buttonEl = document.querySelector('button');

function convert() {
  //! 取值 : console.log(textareaEl.value);
  let text = textareaEl.value.toLowerCase();

  // split 結果為 value，以換行為分界存成 ARRAY
  text = text.split('\n');
  //console.log(text);

  for (let [num, x] of text.entries()) {
    //以底線為分界存成 ARRAY
    let eachIndex = x.split('_');

    //將每一項的 ARRAY 做第一個字及第二個字的修整空白，第二個字字首大寫
    eachIndex = `${eachIndex[0].trim()}${eachIndex[1]
      .trim()
      .replace(eachIndex[1][0], eachIndex[1][0].trim().toUpperCase())}`;

    //將每個字加入階梯狀的✅
    eachIndex = `${eachIndex.padEnd(20, ' ')}${'✅'.repeat(num + 1)}`;

    console.log(eachIndex);
  }
}

buttonEl.addEventListener('click', convert);
*/
