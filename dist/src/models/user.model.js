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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.userExists = userExists;
exports.walletAlreadyTracked = walletAlreadyTracked;
exports.addWalletToTrack = addWalletToTrack;
const prismaClient_js_1 = __importDefault(require("../../prisma/prismaClient.js"));
function createUser(telegramId) {
    return __awaiter(this, void 0, void 0, function* () {
        const created = yield prismaClient_js_1.default.user.create({
            data: {
                telegramId: telegramId,
            },
        });
        console.log("user created");
        return created;
    });
}
function userExists(telegramId) {
    return __awaiter(this, void 0, void 0, function* () {
        const value = yield prismaClient_js_1.default.user.findUnique({
            where: { telegramId }
        });
        return value;
    });
}
function walletAlreadyTracked(accountAddress, telegramId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prismaClient_js_1.default.user.findUnique({
            where: { telegramId }
        });
        if (user) {
            console.log("======>", user);
            const value = yield prismaClient_js_1.default.wallet.findUnique({
                where: {
                    id: user.id,
                    accountAddress: accountAddress
                }
            });
            console.log("value in walletAlreadyExists Prisma method", value);
            return value;
        }
        else {
            console.log("user needs to be investigated", user);
            throw new Error("user error in walletAlreadyTracked method");
        }
    });
}
function addWalletToTrack(accountAddress, telegramId) {
    return __awaiter(this, void 0, void 0, function* () {
        const alreadyTracked = yield walletAlreadyTracked(accountAddress, telegramId);
        if (alreadyTracked) {
            return null;
        }
        else {
            const user = yield prismaClient_js_1.default.user.findUnique({ where: {
                    telegramId: telegramId,
                } });
            if (!user) {
                throw new Error("User not found");
            }
            yield prismaClient_js_1.default.wallet.create({
                data: {
                    accountAddress: accountAddress,
                    userId: user.id
                }
            });
        }
    });
}
