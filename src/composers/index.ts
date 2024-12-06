import { Composer } from 'grammy'
import type { CustomContext } from '../types/CustomContext'

const composer = new Composer<CustomContext>()

composer.command('start', async ctx => {
   await ctx.reply(
    "Welcome! if you would like to track a single token type: /addWallet"
  )})
composer.command('addWallet', async ctx => {
    ctx.session.route = 'add'
    ctx.session.addressToken = ""
    await ctx.reply('Send the address token in double quotes ("")')
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