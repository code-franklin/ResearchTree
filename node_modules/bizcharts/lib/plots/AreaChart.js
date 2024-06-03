"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyfill = void 0;
require("react");
var area_1 = require("@antv/g2plot/lib/plots/area");
var createPlot_1 = __importDefault(require("../createPlot"));
var polyfill_1 = require("./core/polyfill");
var util_1 = require("@antv/util");
;
var polyfill = function (opt) {
    var options = (0, polyfill_1.polyfillOptions)(opt);
    // line
    (0, polyfill_1.polyfillVisible)(options, 'line');
    // point
    (0, polyfill_1.polyfillVisible)(options, 'point');
    // 否则默认开启stack
    options.isStack = (0, util_1.isNil)(options.isStack) ? false : options.isStack;
    (0, polyfill_1.replaceApi)([{
            sourceKey: 'stackField',
            targetKey: 'seriesField',
            notice: 'stackField是旧版api，即将废弃 请使用seriesField替代',
        }], options);
    return options;
};
exports.polyfill = polyfill;
exports.default = (0, createPlot_1.default)(area_1.Area, 'AreaChart', exports.polyfill);
//# sourceMappingURL=AreaChart.js.map