import { Router } from '@grammyjs/router';
import type { CustomContext } from '../types/CustomContext';
import {
  userExists,
  addWalletToTrack,
  walletAlreadyTracked
} from "../models/user.model";

const router = new Router<CustomContext>(ctx => ctx.session.route)

router.route('add', async (ctx, next) => {
    const addressToken = ctx.msg;
    if(addressToken && addressToken.text) {
      const address = String(addressToken.text);
      let userId;
     if(ctx.from){
        userId = String(ctx.from.id);
        console.log("ctx.from",ctx.from.id)
        console.log("passed address token", ctx.msg)
        try{
          const [alreadyTracked, userExistsDB] = await Promise.all([walletAlreadyTracked(address, userId), userExists(userId)])
          console.log("wallet already tracked", alreadyTracked)
          if(!userExistsDB) {
            throw new Error("Error in createUser");
          }
          if(!alreadyTracked) {
            console.log("<<<<<>>>>>>")
             const result = await Promise.all([
             addWalletToTrack(address, userId),
             ctx.reply("That's it. That address is now being tracked. To add another select /addExtraWallet"),
          ])
          if(result) {
            return next()
          }
          }
          if(alreadyTracked) {      
            console.log("<<<<< 1111 >>>>>>")
            await ctx.reply("You are already tracking that address token. Choose /addExtraWallet or /finish")
          }

        } catch(e) {
          console.error("Error in userExists:", e);
        }
  
      }
  
    } else{
      await ctx.reply('Please provide a valid token.')
      return
    }
  
})


export { router }