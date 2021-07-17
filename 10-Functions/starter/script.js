'use strict';

/*
function addTax(rate) {
  return function (value) {
    return value + value * rate;
  };
}

let addVAT = addTax(0.23);
console.log(addVAT(100));
*/

/*Challenge-1
const poll = {
  question: 'What is your favorite programming language?',

  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],

  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    let text = `${this.question}\n${this.options.join(
      '\n'
    )}\n(Write option number)`;

    let ans = Math.trunc(Number(prompt(`${text}`)));
    //console.log(ans);
    if (ans < 4 && ans >= 0) {
      this.answers[ans] += 1;
      this.displayResults();
      this.displayResults('string');
    } else {
      console.log('Wrong input');
    }
  },

  
  Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".


  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // ! ARRAY -> STRING
      console.log(`Poll results are ${this.answers.join(',')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

let Data1 = { answers: [5, 2, 3] };
poll.displayResults.call(Data1);
poll.displayResults.call(Data1, 'string');
*/

//Q2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
