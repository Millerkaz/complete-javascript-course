// Remember, we're gonna use strict mode in all scripts now!
"use strict";

let data1 = [17, 21, 23];
let data2 = [12, 5, -5, 0, 4];
function printForecast(arr) {
  let words = `... `;
  for (let i = 0; i < arr.length; i++) {
    words += ` ${arr[i]}ºC in ${i + 1} days ...`;
  }
  console.log(words);
}

printForecast(data1);
printForecast(data2);
