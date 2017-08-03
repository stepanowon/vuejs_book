"use strict";

var _whatwgFetch = require("whatwg-fetch");

var url = "http://sample.bmaster.kro.kr/contacts_long/search/ja";
(0, _whatwgFetch.fetch)(url).then(function (response) {
    return response.json();
}).then(function (json) {
    return console.log(json);
}).catch(function (e) {
    return console.log(e.message);
});