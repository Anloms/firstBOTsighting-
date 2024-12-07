"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_throttler_1 = require("@grammyjs/transformer-throttler");
const grammy_1 = require("grammy");
const composers_1 = require("./composers");
const joinFly_1 = require("./routers/joinFly");
const addAddress_1 = require("./routers/addAddress");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const telegramString = process.env.TELEGRAM_BOT_TOKEN_ID;
const bot = new grammy_1.Bot(String(telegramString));
// console.log("BOT ===> ", bot)
bot.api.config.use((0, transformer_throttler_1.apiThrottler)());
bot.use((0, grammy_1.session)({
    initial: () => ({
        route: '',
        addressToken: '',
    }),
}));
bot.use(joinFly_1.router);
bot.use(addAddress_1.router);
bot.use(composers_1.composer);
bot.start();
