'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

accounts.forEach(function (v) {
  v.userName = v.owner
    .toLowerCase()
    .split(' ')
    .map(function (n) {
      return n[0];
    })
    .join('');
});

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let curUser;

//登入顯示
function displayUi(user) {
  containerApp.style.opacity = 1;
  containerMovements.innerHTML = '';
  labelWelcome.textContent = `Welcome , ${user.owner.split(' ')[0]}`;
  labelBalance.innerHTML = `${user.movements.reduce((acc, cur) => acc + cur, 0)} €`;

  user.movements.forEach(function (v, i) {
    let type = v > 0 ? 'deposit' : 'withdrawal';
    let text = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${Math.abs(v)}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', text);
  });

  labelSumIn.textContent = `${user.movements.reduce(function (acc, cur) {
    if (cur > 0) {
      return acc + cur;
    } else {
      return acc;
    }
  }, 0)} €`;

  labelSumOut.textContent = `${Math.abs(
    user.movements.reduce(function (acc, cur) {
      if (cur < 0) {
        return acc + cur;
      } else {
        return acc;
      }
    }, 0)
  )} €`;
}

function login(e) {
  e.preventDefault();
  let nameIn = inputLoginUsername.value;
  let passwordIn = Number(inputLoginPin.value);

  accounts.forEach(function (v, i) {
    if (v.userName === nameIn && v.pin === passwordIn) {
      curUser = accounts[i];
      inputLoginUsername.value = '';
      inputLoginUsername.blur();
      inputLoginPin.value = '';
      inputLoginPin.blur();

      displayUi(curUser);
    }
  });
}

btnLogin.addEventListener('click', login);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*Challenge-1
function checkDogs(dogsJulia, dogsKate) {
  let newDogsJulia = [...dogsJulia];
  newDogsJulia.splice(-2, 2);
  newDogsJulia.shift();
  //console.log(newDogsJulia);
  let allDogs = [...newDogsJulia, ...dogsKate];
  allDogs.forEach(function (age, i) {
    let isAdult = age >= 3 ? 'an adult' : 'a puppy';
    console.log(`Dog number ${i + 1} is ${isAdult} , and is ${age} years old`);
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
function addUserName(arr) {
  arr.forEach(function (value) {
    //分割 + 提取字首 + 合併
    let userName = value.owner
      .split(' ')
      .map(function (name) {
        return name.toLowerCase().slice(0, 1);
      })
      .join('');

    //加入obj
    value.userName = userName;
  });
}

let accountsUser = addUserName(accounts);
console.log(accounts);
*/

/*Challenge-2
function calcAverageHumanAge(ages) {
  let toHumanAge = ages.map(function (v) {
    if (v <= 2) {
      return 2 * v;
    } else if (v > 2) {
      return 16 + v * 4;
    }
  });
  console.log(toHumanAge);
  toHumanAge = toHumanAge.filter(function (v) {
    return v >= 18;
  });
  console.log(toHumanAge);
  let avg = toHumanAge.reduce(function (acc, cur, i, arr) {
    //? better
    return acc + cur / arr.length;
  }, 0);
  //   return acc + cur;
  // }, 0) / toHumanAge.length;

  console.log(avg);
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

//Challenge-4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//Q1.
dogs.forEach(function (v) {
  v.recommendedFood = v.weight ** 0.75 * 28;
});

//Q2
let sarah = dogs.find(function (v) {
  return v.owners.includes('Sarah');
});
console.log(sarah.curFood > sarah.recommendedFood * 1.1 ? `Eating too much` : sarah.curFood < sarah.recommendedFood * 0.9 ? `Eating too little` : `Eating an okay amount `);

//Q3
let { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce(
  function (obj, cur) {
    if (cur.curFood > cur.recommendedFood * 1.1) {
      obj.ownersEatTooMuch.push(cur.owners);
      obj.ownersEatTooMuch = obj.ownersEatTooMuch.flat();
      return obj;
    } else if (cur.curFood < cur.recommendedFood * 0.9) {
      obj.ownersEatTooLittle.push(cur.owners);
      obj.ownersEatTooLittle = obj.ownersEatTooLittle.flat();
      return obj;
    } else {
      return obj;
    }
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [] }
);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//Q4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!"`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little !"`);

//Q5
console.log(
  dogs.some(function (v) {
    return v.curFood === v.recommendedFood;
  })
);

//Q6
console.log(
  dogs.some(function (v) {
    return v.curFood < v.recommendedFood * 1.1 && v.curFood > v.recommendedFood * 0.9;
  })
);

//Q7
let dogsOkayFood = dogs.filter(function (v) {
  if (v.curFood < v.recommendedFood * 1.1 && v.curFood > v.recommendedFood * 0.9) {
    return v;
  }
});
console.log(dogsOkayFood);

//Q8
let dogsCopy = dogs.slice();
dogsCopy.sort(function (a, b) {
  return a.recommendedFood - b.recommendedFood;
});
console.log(dogs === dogsCopy);
console.log(dogsCopy);
