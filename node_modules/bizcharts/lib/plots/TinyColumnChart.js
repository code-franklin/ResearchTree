"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("react");
var tiny_column_1 = require("@antv/g2plot/lib/plots/tiny-column");
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
    (0, set_1.default)(options, 'tooltip', false);
    return options;
};
exports.default = (0, createPlot_1.default)(tiny_column_1.TinyColumn, 'TinyColumnChart', polyfill);
//# sourceMappingURL=TinyColumnChart.js.map