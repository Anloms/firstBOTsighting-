
import prisma from '../../prisma/prismaClient.js';

export async function createUser(telegramId: string) {
   await prisma.user.create({
    data: {
      telegramId: telegramId,
    },
  });
  return
}

export async function userExists(telegramId: string) {
   const value = await prisma.user.findUnique({
    where: { telegramId },
  });
  return value

}
export async function walletAlreadyTracked(accountAddress:string, telegramId:string){
  const value = await prisma.wallet.findUnique({
    where: {
      id: telegramId,
      accountAddress: accountAddress
    }
  })
  return value
}
export async function addWalletToTrack(accountAddress: string, telegramId: string){
  const alreadyTracked = await walletAlreadyTracked(accountAddress, telegramId)
  if(alreadyTracked) {
    return "already tracked"
  } else {
    const user = await prisma.user.findUnique({where: {
      id: telegramId,
    }})
    if(!user) {
      throw new Error("User not found")
    }
    await prisma.wallet.create({
      data:{
        accountAddress: accountAddress,
        userId: user.id
      }
    })
  }
}
