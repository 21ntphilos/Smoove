"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.musicRouter = express_1.default.Router();
/**
 * @swagger
 * /api/music:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello music
 */
exports.musicRouter
    .get("/", (req, res) => {
    res.send("hello music");
})
    .post("/create", () => { })
    .put("/update/:id", () => { })
    .delete("/delete/:id", () => { });
//# sourceMappingURL=music.js.map