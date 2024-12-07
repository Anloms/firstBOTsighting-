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
router.route('add', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const addressToken = ctx.msg;
    if (addressToken && addressToken.text) {
        const address = String(addressToken.text);
        let userId;
        if (ctx.from) {
            userId = String(ctx.from.id);
            console.log("ctx.from", ctx.from.id);
            console.log("passed address token", ctx.msg);
            try {
                const [alreadyTracked, userExistsDB] = yield Promise.all([(0, user_model_1.walletAlreadyTracked)(address, userId), (0, user_model_1.userExists)(userId)]);
                console.log("wallet already tracked", alreadyTracked);
                if (!userExistsDB) {
                    throw new Error("Error in createUser");
                }
                if (!alreadyTracked) {
                    console.log("<<<<<>>>>>>");
                    const result = yield Promise.all([
                        (0, user_model_1.addWalletToTrack)(address, userId),
                        ctx.reply("That's it. That address is now being tracked. To add another select /addExtraWallet"),
                    ]);
                    if (result) {
                        return next();
                    }
                }
                if (alreadyTracked) {
                    console.log("<<<<< 1111 >>>>>>");
                    yield ctx.reply("You are already tracking that address token. Choose /addExtraWallet or /finish");
                }
            }
            catch (e) {
                console.error("Error in userExists:", e);
            }
        }
    }
    else {
        yield ctx.reply('Please provide a valid token.');
        return;
    }
}));
