import { Router } from '@grammyjs/router';
import type { CustomContext } from '../types/CustomContext';
import {
  createUser,
  userExists,
  addWalletToTrack,
  walletAlreadyTracked
} from "../models/user.model";

const router = new Router<CustomContext>(ctx => ctx.session.route)

router.route('join', async (ctx, next )=> {

     if(ctx.from){
        let userId = String(ctx.from.id);
        
        try {
          const userExistsDB = await userExists(userId);
          console.log("USER EXIST DB VARIABLE", userExistsDB)
          if(!userExistsDB) {
            const created = await createUser(userId);
            if(created) {
              return next()
            }
            else throw new Error("failed to create a new user");
          }
        } catch (error) {
          console.error("Error in userExists:", error);
        }
        
      }
  
})


export { router }