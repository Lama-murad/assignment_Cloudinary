"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./card.scss");
function Card(prop) {
    return (react_1["default"].createElement("div", { className: "MainCard" },
        react_1["default"].createElement("img", { className: 'imgMainCard', src: prop.image }),
        react_1["default"].createElement("div", { className: 'imgMaintxt' },
            react_1["default"].createElement("div", null,
                " name:  ",
                prop.name),
            react_1["default"].createElement("div", null,
                "age: ",
                prop.age),
            react_1["default"].createElement("div", null,
                "level: ",
                prop.level),
            react_1["default"].createElement("div", null, prop.desc))));
}
exports["default"] = Card;
