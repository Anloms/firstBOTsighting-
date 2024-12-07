
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { Bot, session } from 'grammy'
import { composer } from './composers'

import { router as joinFly } from './routers/joinFly';
import { router as addAddress } from './routers/addAddress';


import type { CustomContext } from './types/CustomContext';
import type { SessionData } from './types/SessionData';
import dotenv from 'dotenv';
dotenv.config();
const telegramString = process.env.TELEGRAM_BOT_TOKEN_ID;


const bot = new Bot<CustomContext>(String(telegramString))
// console.log("BOT ===> ", bot)

bot.api.config.use(apiThrottler())

bot.use(
    session({
        initial: (): SessionData => ({
            route: '',
            addressToken: '',
        }),
    })
)

bot.use(joinFly)
bot.use(addAddress)

bot.use(composer)


bot.start()