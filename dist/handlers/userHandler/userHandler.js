"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changepassword = exports.requestPassword = exports.verifyUser = exports.update = exports.signin = exports.Register = void 0;
const model_1 = require("../../model");
const auth_utils_1 = require("../../utils/auth-utils");
const uuid_1 = require("uuid");
const notification_1 = require("../../utils/notification");
/* =============SIGNUP=======================. */
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, password, gender, date_birth } = req.body;
        const uuiduser = (0, uuid_1.v4)();
        const salt = yield (0, auth_utils_1.GenerateSalt)();
        const userPassword = yield (0, auth_utils_1.GeneratePassword)(password, salt);
        //check if user already exists using key value pairs in the object
        const userCheck = yield model_1.UserInstance.findOne({ where: { email: email } });
        //Create User
        if (!userCheck) {
            let newUser = (yield model_1.UserInstance.create({
                id: uuiduser,
                email,
                userName,
                gender,
                date_birth,
                password: userPassword,
                salt,
                verified: false,
            }));
            const token = yield (0, auth_utils_1.GenerateSignature)({
                id: newUser.id,
                email: newUser.email,
                verified: newUser.verified,
                isLoggedIn: false,
            });
            const temp = (0, notification_1.welcomeEmail)(userName, token);
            yield (0, notification_1.sendEmail)(email, "Signup success", temp);
            return res.status(201).json({
                message: "User created successfully, check your email to activate you account",
                token,
            });
        }
        else {
            //User already exists
            throw { code: 400, message: "User already exists" };
        }
    }
    catch (err) {
        next(err);
    }
});
exports.Register = Register;
/* =============LOGIN=======================. */
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const User = (yield model_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (!User) {
            throw { code: 400, message: "Invalide Email or Password" };
        }
        else {
            //validate password
            const validPassword = yield (0, auth_utils_1.validatePassword)(password, User.password, User.salt);
            if (!validPassword)
                throw { code: 400, message: "Invalide Email or Password" };
            const payload = {
                id: User.id,
                email: User.email,
                verified: User.verified,
                isLoggedIn: true,
            };
            const signature = yield (0, auth_utils_1.GenerateSignature)(payload);
            return res.status(200).json({
                message: "Login successful",
                signature: signature,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
/* =============UPDATE=======================. */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, country, password, address, currency } = req.body;
    const id = req.user.id;
    try {
        const User = (yield model_1.UserInstance.findOne({
            where: { id: id },
        }));
        if (!User)
            throw { code: 401, message: "unAuthorised please Login" };
        const updatedUser = (yield model_1.UserInstance.update({
            firstName,
            lastName,
            country,
            password,
            address,
            currency,
        }, { where: { id: id } }));
        if (updatedUser) {
            const User = (yield model_1.UserInstance.findOne({
                where: { id: id },
            }));
            return res.status(200).json({
                message: "You have successfully updated your profile",
                User,
            });
        }
        throw { code: 500, message: "Something went wrong" };
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (token) {
            const verified = yield (0, auth_utils_1.verifySignature)(token);
            if (verified) {
                yield model_1.UserInstance.update({
                    verified: true,
                }, {
                    where: { id: verified.id },
                });
                return res.status(200).json({
                    message: "User verified",
                });
            }
        }
        throw { code: 401, message: "Unauthorized" };
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUser = verifyUser;
/*================= forgot Password ================*/
const requestPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = (yield model_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (!user)
            throw { status: "Email is Incorect!!" };
        const otp = yield (0, auth_utils_1.GenerateSalt)();
        let token = yield (0, auth_utils_1.GenerateSignature)({
            id: user.id,
            email,
            otp,
        });
        yield model_1.UserInstance.update({
            otp: otp,
        }, {
            where: { id: user.id },
        });
        const template = yield (0, notification_1.passworTemplate)(user.userName, token);
        let result = yield (0, notification_1.sendEmail)(user.email, "PASSWORD RESETE", template);
        res.status(200).json({ status: "Email Sent!!", result });
    }
    catch (error) {
        next(error);
    }
});
exports.requestPassword = requestPassword;
const changepassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        const data = yield (0, auth_utils_1.verifySignature)(token);
        const { id, email, otp } = data;
        const user = yield model_1.UserInstance.findOne({
            where: {
                email: email,
                otp,
            },
        });
        if (!user)
            throw { code: 401, message: "Not Valide" };
        const salt = yield (0, auth_utils_1.GenerateSalt)();
        const userPassword = yield (0, auth_utils_1.GeneratePassword)(password, salt);
        yield model_1.UserInstance.update({
            salt,
            password: userPassword,
            otp: "",
        }, {
            where: { id: id },
        });
        res
            .status(201)
            .json({ code: 201, message: "password updated successfully" });
        console.log(token, userPassword);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.changepassword = changepassword;
//# sourceMappingURL=userHandler.js.map