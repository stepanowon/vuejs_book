"use strict";

var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        var num = Math.round(Math.random() * 20);
        var isValid = num % 2;
        if (isValid) {
            resolve(num);
        } else {
            reject(num);
        }
    }, 2000);
});

p.then(function (num) {
    console.log("홀수 : " + num);
}).catch(function (num) {
    console.log("짝수 : " + num);
});

console.log("20까지의 난수중 홀수/짝수?");
console.log("결과는 2초후에 나옵니다.!!");