import { Router } from '@grammyjs/router';
import type { CustomContext } from '../types/CustomContext';
import { isSolanaAddress } from '../lib/helpers';

const router = new Router<CustomContext>(ctx => ctx.session.route)

// router.route('addMore', async ctx => {
//   const addressToken = ctx.msg?.text;
//   if(addressToken!== undefined && isSolanaAddress(addressToken)) {
//       await ctx.reply('Token Successfully added.')
//       return
//   }
//   if (!addressToken) {
//     await ctx.reply('Please provide a valid token.')
//     return
// }
//     // ctx.session.addressToken = addressToken;
//     ctx.session.route = 'addMore'

//     await ctx.reply("Please provide the next token")
// })

router.route('addMore', async ctx => {
    //TODO 4: rewrite addMultiple; ensure each output is validated
    //TODO 5: add /finish router with a nice goodbye message
    const addressToken= ctx.msg;
    if(addressToken!== undefined && addressToken.text) {
        await ctx.reply('Token Successfully added.')
        return
    }
    if (!addressToken) {
        await ctx.reply('Please provide a valid token.')
        return
    }

    // ctx.session.addressToken = addressToken;
    // ctx.session.route = 'addMore'

    await ctx.reply("Please provide the next token or finish by typing /finish")
})

export { router }