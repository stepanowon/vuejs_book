class Person {
    constructor(name, tel, address) {
        this.name = name;
        this.tel = tel;
        this.address = address;
        if (Person.count) { Person.count++; } else { Person.count = 1; }    
    }
    static getPersonCount() { 
        return Person.count; 
    }
    toString() {
        return `name=${this.name}, tel=${this.tel}, address=${this.address}`;
    }
}

var p1 = new Person('이몽룡', '010-222-3332', '경기도');
var p2 = new Person('홍길동', '010-222-3333', '서울');
console.log(p1.toString());
console.log(Person.getPersonCount());