"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Region = exports.Line = exports.Image = exports.ReactElement = exports.Html = exports.RegionFilter = exports.DataRegion = exports.DataMarker = exports.Arc = exports.Base = void 0;
// annotation G2暂不支持自定义组件。
var base_1 = require("./base");
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return __importDefault(base_1).default; } });
var arc_1 = require("./arc");
Object.defineProperty(exports, "Arc", { enumerable: true, get: function () { return __importDefault(arc_1).default; } });
var dataMarker_1 = require("./dataMarker");
Object.defineProperty(exports, "DataMarker", { enumerable: true, get: function () { return __importDefault(dataMarker_1).default; } });
var dataRegion_1 = require("./dataRegion");
Object.defineProperty(exports, "DataRegion", { enumerable: true, get: function () { return __importDefault(dataRegion_1).default; } });
var regionFilter_1 = require("./regionFilter");
Object.defineProperty(exports, "RegionFilter", { enumerable: true, get: function () { return __importDefault(regionFilter_1).default; } });
var html_1 = require("./html");
Object.defineProperty(exports, "Html", { enumerable: true, get: function () { return __importDefault(html_1).default; } });
var reactElement_1 = require("./reactElement");
Object.defineProperty(exports, "ReactElement", { enumerable: true, get: function () { return __importDefault(reactElement_1).default; } });
var image_1 = require("./image");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return __importDefault(image_1).default; } });
var line_1 = require("./line");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return __importDefault(line_1).default; } });
var region_1 = require("./region");
Object.defineProperty(exports, "Region", { enumerable: true, get: function () { return __importDefault(region_1).default; } });
var text_1 = require("./text");
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return __importDefault(text_1).default; } });
//# sourceMappingURL=index.js.map