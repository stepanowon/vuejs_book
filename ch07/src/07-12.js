var s1 = new Set();
s1.add("사과");   s1.add("배");
s1.add("사과");   s1.add("포도");
//실행 결과 : Set { '사과', '배', '포도' }
console.log(s1);

var john = new Set(["사과", "포도", "배"]);
var susan = new Set(["파인애플", "키위", "배"]);

//합집합 : Set { '사과', '포도', '배', '파인애플', '키위' }
var union = new Set([...john.values(), ...susan.values()]);
console.log(union);

//교집합 : Set { '배' }
var intersection = new Set([...john.values()].filter(e => susan.has(e)));
console.log(intersection);

//차집합 : Set { '사과', '포도' }
var diff = new Set([...john.values()].filter(e => !susan.has(e)));
console.log(diff);