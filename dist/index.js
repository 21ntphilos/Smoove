"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./config/index"));
const server_1 = __importDefault(require("./server"));
server_1.default.listen(index_1.default.port, () => {
    console.log(`Server running on port ${index_1.default.port}`);
});
//# sourceMappingURL=index.js.map