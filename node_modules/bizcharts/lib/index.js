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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withChartInstance = exports.withView = exports.useTheme = exports.useChartInstance = exports.useRootChart = exports.useView = exports.createTooltipConnector = exports.createPlot = exports.Interaction = exports.Effects = exports.Guide = exports.Coord = exports.Geom = exports.LineAdvance = exports.Path = exports.Label = exports.BaseGeom = exports.Schema = exports.Polygon = exports.Point = exports.Line = exports.Interval = exports.Heatmap = exports.Edge = exports.Area = exports.Slider = exports.Facet = exports.Axis = exports.Coordinate = exports.Legend = exports.Tooltip = exports.View = exports.Chart = exports.GComponents = exports.G2 = exports.Annotation = exports.Util = void 0;
var antUtils = __importStar(require("@antv/util"));
var Annotation = __importStar(require("./components/Annotation"));
exports.Annotation = Annotation;
var G2 = __importStar(require("./g2-all"));
exports.G2 = G2;
var GComponents = __importStar(require("./g-components"));
exports.GComponents = GComponents;
var bxUtil = __importStar(require("./utils"));
exports.Util = __assign(__assign(__assign({}, antUtils), bxUtil), G2.Util);
var Chart_1 = require("./components/Chart");
Object.defineProperty(exports, "Chart", { enumerable: true, get: function () { return __importDefault(Chart_1).default; } });
var View_1 = require("./components/View");
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return __importDefault(View_1).default; } });
var Tooltip_1 = require("./components/Tooltip");
Object.defineProperty(exports, "Tooltip", { enumerable: true, get: function () { return __importDefault(Tooltip_1).default; } });
var Legend_1 = require("./components/Legend");
Object.defineProperty(exports, "Legend", { enumerable: true, get: function () { return __importDefault(Legend_1).default; } });
var Coordinate_1 = require("./components/Coordinate");
Object.defineProperty(exports, "Coordinate", { enumerable: true, get: function () { return __importDefault(Coordinate_1).default; } });
var Axis_1 = require("./components/Axis");
Object.defineProperty(exports, "Axis", { enumerable: true, get: function () { return __importDefault(Axis_1).default; } });
var Facet_1 = require("./components/Facet");
Object.defineProperty(exports, "Facet", { enumerable: true, get: function () { return __importDefault(Facet_1).default; } });
var Slider_1 = require("./components/Slider");
Object.defineProperty(exports, "Slider", { enumerable: true, get: function () { return __importDefault(Slider_1).default; } });
// geometry
var Area_1 = require("./geometry/Area");
Object.defineProperty(exports, "Area", { enumerable: true, get: function () { return __importDefault(Area_1).default; } });
var Edge_1 = require("./geometry/Edge");
Object.defineProperty(exports, "Edge", { enumerable: true, get: function () { return __importDefault(Edge_1).default; } });
var Heatmap_1 = require("./geometry/Heatmap");
Object.defineProperty(exports, "Heatmap", { enumerable: true, get: function () { return __importDefault(Heatmap_1).default; } });
var Interval_1 = require("./geometry/Interval");
Object.defineProperty(exports, "Interval", { enumerable: true, get: function () { return __importDefault(Interval_1).default; } });
var Line_1 = require("./geometry/Line");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return __importDefault(Line_1).default; } });
var Point_1 = require("./geometry/Point");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return __importDefault(Point_1).default; } });
var Polygon_1 = require("./geometry/Polygon");
Object.defineProperty(exports, "Polygon", { enumerable: true, get: function () { return __importDefault(Polygon_1).default; } });
var Schema_1 = require("./geometry/Schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return __importDefault(Schema_1).default; } });
var Base_1 = require("./geometry/Base");
Object.defineProperty(exports, "BaseGeom", { enumerable: true, get: function () { return __importDefault(Base_1).default; } });
var Label_1 = require("./geometry/Label");
Object.defineProperty(exports, "Label", { enumerable: true, get: function () { return __importDefault(Label_1).default; } });
var Path_1 = require("./geometry/Path");
Object.defineProperty(exports, "Path", { enumerable: true, get: function () { return __importDefault(Path_1).default; } });
var LineAdvance_1 = require("./geometry/LineAdvance");
Object.defineProperty(exports, "LineAdvance", { enumerable: true, get: function () { return __importDefault(LineAdvance_1).default; } });
// 通用 geometry
var geometry_1 = require("./geometry");
Object.defineProperty(exports, "Geom", { enumerable: true, get: function () { return __importDefault(geometry_1).default; } });
// 兼容
var coord_1 = require("./components/Coordinate/coord");
Object.defineProperty(exports, "Coord", { enumerable: true, get: function () { return __importDefault(coord_1).default; } });
var Guide_1 = require("./adapter/Guide");
Object.defineProperty(exports, "Guide", { enumerable: true, get: function () { return __importDefault(Guide_1).default; } });
// 工具
var Effects_1 = require("./components/Effects");
Object.defineProperty(exports, "Effects", { enumerable: true, get: function () { return __importDefault(Effects_1).default; } });
var Interaction_1 = require("./components/Interaction");
Object.defineProperty(exports, "Interaction", { enumerable: true, get: function () { return __importDefault(Interaction_1).default; } });
var createPlot_1 = require("./createPlot");
Object.defineProperty(exports, "createPlot", { enumerable: true, get: function () { return __importDefault(createPlot_1).default; } });
var createTooltipConnector_1 = require("./connector/createTooltipConnector");
Object.defineProperty(exports, "createTooltipConnector", { enumerable: true, get: function () { return __importDefault(createTooltipConnector_1).default; } });
// hooks
var useChartView_1 = require("./hooks/useChartView");
Object.defineProperty(exports, "useView", { enumerable: true, get: function () { return __importDefault(useChartView_1).default; } });
// fixme: 更名，在5.0后正式更名为 useChartInstance
var useChartInstance_1 = require("./hooks/useChartInstance");
Object.defineProperty(exports, "useRootChart", { enumerable: true, get: function () { return __importDefault(useChartInstance_1).default; } });
// 正确写法
var useChartInstance_2 = require("./hooks/useChartInstance");
Object.defineProperty(exports, "useChartInstance", { enumerable: true, get: function () { return __importDefault(useChartInstance_2).default; } });
var useTheme_1 = require("./hooks/useTheme");
Object.defineProperty(exports, "useTheme", { enumerable: true, get: function () { return __importDefault(useTheme_1).default; } });
var view_1 = require("./context/view");
Object.defineProperty(exports, "withView", { enumerable: true, get: function () { return view_1.withView; } });
var root_1 = require("./context/root");
Object.defineProperty(exports, "withChartInstance", { enumerable: true, get: function () { return root_1.withChartInstance; } });
// 注册主题
__exportStar(require("./core"), exports);
// 基于 g2-plots 基础图表
__exportStar(require("./plots"), exports);
// g-components
//# sourceMappingURL=index.js.map