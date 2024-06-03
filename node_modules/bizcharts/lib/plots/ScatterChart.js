"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("react");
var get_1 = __importDefault(require("@antv/util/lib/get"));
var set_1 = __importDefault(require("@antv/util/lib/set"));
var scatter_1 = require("@antv/g2plot/lib/plots/scatter");
var createPlot_1 = __importDefault(require("../createPlot"));
var polyfill_1 = require("./core/polyfill");
var util_1 = require("@antv/util");
var polyfill = function (opt) {
    var options = (0, polyfill_1.polyfillOptions)(opt);
    if ((0, get_1.default)(options, 'pointSize')) {
        (0, set_1.default)(options, 'size', (0, get_1.default)(options, 'pointSize'));
    }
    (0, polyfill_1.polyfillVisible)(options, 'quadrant');
    var quadrantLabel = (0, get_1.default)(options, 'quadrant.label');
    var qLabels = (0, get_1.default)(options, 'quadrant.labels');
    if (!qLabels && quadrantLabel) {
        var text = quadrantLabel.text, style_1 = quadrantLabel.style;
        if (text && text.length && style_1) {
            var labels = text.map(function (txt) { return ({ style: style_1, content: txt }); });
            (0, set_1.default)(options, 'quadrant.labels', labels);
        }
    }
    var regressionLine = (0, get_1.default)(options, 'regressionLine');
    if (!regressionLine) {
        var trendline = (0, get_1.default)(options, 'trendline');
        if ((0, util_1.isObject)(trendline) && (0, get_1.default)(trendline, 'visible') === false) {
            (0, set_1.default)(options, 'regressionLine', null);
        }
        else {
            (0, set_1.default)(options, 'regressionLine', trendline);
        }
    }
    return options;
};
exports.default = (0, createPlot_1.default)(scatter_1.Scatter, 'ScatterChart', polyfill);
//# sourceMappingURL=ScatterChart.js.map