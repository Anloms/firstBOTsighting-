import { Composer } from 'grammy'
import type { CustomContext } from '../types/CustomContext'

const composer = new Composer<CustomContext>()

composer.command('start', async ctx => {
   await ctx.reply(
    "Welcome! if you would like to join: /joinFly or, if you have an account /addWallet"
  )
  
})
composer.command('joinFly', async (ctx, next) => {
    ctx.session.route = 'join'
    ctx.session.addressToken = ""
    await ctx.reply('great! Now you can /addWallet')
})
composer.command('addWallet', async ctx => {
    ctx.session.route = 'add'
    ctx.session.addressToken = ""
    await ctx.reply('Paste the address token')
})

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

composer.command('help', async ctx => {
    await ctx.reply(
        'To add address, do /addWallet.'
    )
})



export { composer }