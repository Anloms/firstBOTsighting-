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
exports.router = void 0;
const router_1 = require("@grammyjs/router");
const user_model_1 = require("../models/user.model");
const router = new router_1.Router(ctx => ctx.session.route);
exports.router = router;
router.route('join', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.from) {
        let userId = String(ctx.from.id);
        try {
            const userExistsDB = yield (0, user_model_1.userExists)(userId);
            console.log("USER EXIST DB VARIABLE", userExistsDB);
            if (!userExistsDB) {
                const created = yield (0, user_model_1.createUser)(userId);
                if (created) {
                    return next();
                }
                else
                    throw new Error("failed to create a new user");
            }
        }
        catch (error) {
            console.error("Error in userExists:", error);
        }
    }
}));
