// import { Bot, GrammyError, HttpError } from "grammy";

// const bot = new Bot("");

// bot.command("start", (ctx) => ctx.reply("Welcome! This is a fly on the wall bot."));

// bot.on('message:text', ctx => { 
//   const text: string = ctx.msg.text;
//   if(text == "/echo_do") return ctx.reply("Heard the echo..");
//   else return ctx.reply("Got another message!")
//  })
// bot.catch((err)=>{
//   const ctx = err.ctx;
//   console.error(`Error while handling update ${ctx.update.update_id}:`);
//   const e = err.error;
//   if (e instanceof GrammyError) {
//     console.error("Error in request:", e.description);
//   } else if (e instanceof HttpError) {
//     console.error("Could not contact Telegram:", e);
//   } else {
//     console.error("Unknown error:", e);
//   }
// })


// bot.start();

import { apiThrottler } from '@grammyjs/transformer-throttler'
import { Bot, session } from 'grammy'
import { composer } from './composers'
import { router as addRouter } from './routers/add'
import { router as multiplyRouter } from './routers/multiply'

import type { CustomContext } from './types/CustomContext'
import type { SessionData } from './types/SessionData'

const bot = new Bot<CustomContext>('')


bot.api.config.use(apiThrottler())

bot.use(
    session({
        initial: (): SessionData => ({
            route: '',
            leftOperand: 0,
            rightOperand: 0,
        }),
    })
)

bot.use(addRouter)
bot.use(multiplyRouter)

bot.use(composer)

bot.start()