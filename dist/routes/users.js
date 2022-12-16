"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = __importDefault(require("express"));
const userHandler_1 = require("../handlers/userHandler");
const userHandler_2 = require("../handlers/userHandler/userHandler");
const auth_1 = require("../middleware/auth/auth");
const joi_validator_1 = require("../utils/joi-validator");
const schema_1 = require("../utils/joi-validator/schema");
exports.usersRoute = express_1.default.Router();
/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns User Object
 */
exports.usersRoute.post("/signup", joi_validator_1.RegisterUser, userHandler_1.Register);
exports.usersRoute.post("/signin", joi_validator_1.loginUser, userHandler_1.signin);
exports.usersRoute.patch("/update", joi_validator_1.updateUser, auth_1.auth, userHandler_1.update);
exports.usersRoute.post("/resetpassword", schema_1.sendemailToken, userHandler_2.requestPassword);
exports.usersRoute.patch("/verify/:token", userHandler_2.verifyUser);
exports.usersRoute.post("/changepassword", joi_validator_1.changePasswordJoi, userHandler_2.changepassword);
//# sourceMappingURL=users.js.map