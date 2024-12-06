import { Router } from '@grammyjs/router';
import type { CustomContext } from '../types/CustomContext';
// import { isSolanaAddress } from '../lib/helpers';
import { 
  addAddressNewUser, 
  isAddressTracked,
  userExists,
  appendOne
 } from '../models/address.model';

const router = new Router<CustomContext>(ctx => ctx.session.route)

router.route('add', async ctx => {
  //TODO 1: validate the address format before processing
  //TODO 2: default errror message for unhandled errors
  //TODO 3: addressToken.text => more robust validation with REGEX
    const addressToken = ctx.msg;
    if(addressToken && addressToken.text && ctx.from) {
      const address = addressToken.text;
      let userId;
     if(ctx.from){
        userId = ctx.from.id;
        console.log("USER ID", userId)
 

        // const [alreadyTracked, userExistsDB] = await Promise.all([])
        // const [alreadyTracked, userExistsDB] = await Promise.all([isAddressTracked(userId,address),userExists(userId)])

        // if (userExistsDB&& alreadyTracked) {
        //   console.log("userExists && alreadyTracked")
        //   await ctx.reply('This address is already being tracked. ');
        //   return;
        // } 
        // else if(!userExistsDB && !alreadyTracked) {
        //   console.log("!userExists && !alreadyTracked")
        //   await Promise.all([
        //      addAddressNewUser(userId, address),
        //      ctx.reply("That's it. That address is now being tracked. If you want to track another token write /addMultiple"),
        //   ])
        // } 
        // else if(userExistsDB && !alreadyTracked) {
        //   console.log("userExists && !alreadyTracked")
        //   await Promise.all([
        //     appendOne(userId, address),
        //     ctx.reply("That's it. That address is now being tracked. If you want to track another token write /addMultiple")
        //   ])
        // } 
        // else {
        //   console.error("Error in addAddress router")
        //   await ctx.reply("Unexpected error, please try again later.")
        // }
   
        //  ctx.session.route = 'addMore';
        
      }
  
    } else{
      await ctx.reply('Please provide a valid token.')
      return
    }
  
})


export { router }