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
exports.composer = void 0;
const grammy_1 = require("grammy");
const composer = new grammy_1.Composer();
exports.composer = composer;
composer.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Welcome! if you would like to join: /joinFly or, if you have an account /addWallet");
}));
composer.command('joinFly', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.route = 'join';
    ctx.session.addressToken = "";
    yield ctx.reply('great! Now you can /addWallet');
}));
composer.command('addWallet', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.route = 'add';
    ctx.session.addressToken = "";
    yield ctx.reply('Paste the address token');
}));
// composer.command('addMultiple', async ctx => {
//     ctx.session.route = 'addMore'
//     ctx.session.addressToken = ""
//     await ctx.reply('Send the address token in double quotes ("")')
// })
// composer.command('removeAddress', async ctx => {
//     ctx.session.route = 'remove'
//     ctx.session.addressToken = ""
//     await ctx.reply('Send the address token in double quotes ("")')
// })
composer.command('help', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('To add address, do /addWallet.');
}));
