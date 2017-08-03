'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
    function Person(name, tel, address) {
        _classCallCheck(this, Person);

        this.name = name;
        this.tel = tel;
        this.address = address;
        if (Person.count) {
            Person.count++;
        } else {
            Person.count = 1;
        }
    }

    _createClass(Person, [{
        key: 'toString',
        value: function toString() {
            return 'name=' + this.name + ', tel=' + this.tel + ', address=' + this.address;
        }
    }], [{
        key: 'getPersonCount',
        value: function getPersonCount() {
            return Person.count;
        }
    }]);

    return Person;
}();

var p1 = new Person('이몽룡', '010-222-3332', '경기도');
var p2 = new Person('홍길동', '010-222-3333', '서울');
console.log(p1.toString());
console.log(Person.getPersonCount());