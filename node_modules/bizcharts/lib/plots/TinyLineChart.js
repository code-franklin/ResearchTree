"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("react");
var tiny_line_1 = require("@antv/g2plot/lib/plots/tiny-line");
var get_1 = __importDefault(require("@antv/util/lib/get"));
var set_1 = __importDefault(require("@antv/util/lib/set"));
var createPlot_1 = __importDefault(require("../createPlot"));
var polyfill_1 = require("./core/polyfill");
var util_1 = require("@antv/util");
var polyfill = function (opt) {
    var options = (0, polyfill_1.polyfillOptions)(opt);
    if (!(0, util_1.isNil)(options.yField)) { // yField不是null/undefined
        var list = options.data
            .map(function (item) { return item[options.yField]; })
            .filter(function (val) { return !(0, util_1.isNil)(val); });
        list && list.length && (0, set_1.default)(options, 'data', list);
    }
    var size = (0, get_1.default)(options, 'size');
    if (!(0, util_1.isNil)(size)) {
        var lineStyle = (0, get_1.default)(options, 'lineStyle', {});
        (0, set_1.default)(options, 'lineStyle', __assign(__assign({}, lineStyle), { lineWidth: size }));
    }
    (0, set_1.default)(options, 'tooltip', false);
    return options;
};
exports.default = (0, createPlot_1.default)(tiny_line_1.TinyLine, 'TinyLineChart', polyfill);
//# sourceMappingURL=TinyLineChart.js.map