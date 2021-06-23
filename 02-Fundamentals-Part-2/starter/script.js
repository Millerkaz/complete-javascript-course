"use strack";
/*
//Q1
let calcAverage = (sc1, sc2, sc3) => (sc1 + sc2 + sc3) / 3;
let avgD = calcAverage(44, 23, 71);
let avgK = calcAverage(65, 54, 49);
let avgD2 = calcAverage(85, 54, 41);
let avgK2 = calcAverage(23, 34, 27);
let checkWinner = function (avgDolphins, avgKoalas) {
    avgDolphins >= avgKoalas * 2 ? console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`) :
        avgKoalas >= avgDolphins * 2 ? console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`) :
            console.log(`NO winner (${avgKoalas} vs. ${avgDolphins})`);

}
checkWinner(avgD, avgK);
checkWinner(avgD2, avgK2);
*/

/*
//Q2
const bills = [125, 555, 44];
let calcPrice = function (price) {
    let tipPrices = [];
    let totalPrices = [];
    for (i = 0; i < price.length; i++) {
        let tip;
        (50 <= price[i] && price[i] <= 300) ? tip = price[i] * 0.15 : tip = price[i] * 0.2;
        tipPrices.push(tip);
        totalPrices.push(price[i] + tip);
    };
    console.log(`Tip prices are : ${tipPrices}`);
    console.log(`Total prices are : ${totalPrices}`)
    return {                           //回傳TIP和TOTAL的陣列，確保每一次宣告函式時陣列能獨立保存。
        tipPrices: tipPrices,
        totalPrices: totalPrices
    }
}
let result1 = calcPrice(bills);
console.log(result1.tipPrices);

let result2 = calcPrice([426, 228, 6464, 7414]);
console.log(result2.totalPrices);
*/
/*
//Q3
function PersonCont(fullName, mass, height) {
    this.fullName = fullName;
    this.mass = mass;
    this.height = height;
    this.calcBMI = function () {
        this.BMI = this.mass / (this.height ** 2);
        return this.BMI
    };
};

let mark = new PersonCont("Mark Miller", 78, 1.69);
let john = new PersonCont("John Smith", 92, 1.95);

mark.calcBMI();
john.calcBMI();
let result = mark.BMI > john.BMI ? `${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s BMI (${john.BMI})` :
    `${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s BMI (${mark.BMI})`;

console.log(result);
*/
/*
//Q4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let calcPrice = function (price) {
    let tipPrices = [];
    let totalPrices = [];
    for (let i = 0; i < price.length; i++) {
        let tip;
        (50 <= price[i] && price[i] <= 300) ? tip = price[i] * 0.15 : tip = price[i] * 0.2;
        tipPrices.push(tip);
        totalPrices.push(price[i] + tip);
    };
    return {                           //回傳TIP和TOTAL的陣列，確保每一次宣告函式時陣列能獨立保存。
        tipPrices: function () {
            //console.log(`Tip prices are : ${tipPrices}`);
            return tipPrices;
        },
        totalPrices: function () {
            //console.log(`Total prices are : ${totalPrices}`)
            return totalPrices;
        }
    }
}

//BONUS
let calcAverage = function (arr) {
    let sum = 0;
    let avg;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    avg = sum / arr.length;
    console.log(avg);
}

calcAverage(calcPrice(bills).totalPrices());
*/