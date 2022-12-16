"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRoute = void 0;
const express_1 = require("express");
exports.playlistRoute = (0, express_1.Router)();
/**
 * @swagger
 * /api/playlist:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello playlist
 */
exports.playlistRoute
    .get("/", (req, res) => {
    res.send("hello playlist");
})
    .post("/create", () => { })
    .put("/update/:id", () => { })
    .delete("/delete/:id", () => { });
//# sourceMappingURL=playlist.js.map