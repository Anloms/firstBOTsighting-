
import prisma from '../../prisma/prismaClient.js';


export async function createUser(telegramId: string) {
  const created =  await prisma.user.create({
    data: {
      telegramId: telegramId,
    },
  });
  console.log("user created")
  return created
}

export async function userExists(telegramId: string) {
   const value = await prisma.user.findUnique({
    where: { telegramId }
  });
  return value

}
export async function walletAlreadyTracked(accountAddress:string, telegramId:string){
  const user = await prisma.user.findUnique({
    where: { telegramId }
  });
  if(user){
    console.log("======>", user)
    const value = await prisma.wallet.findUnique({
      where: {
        id: user.id,
        accountAddress: accountAddress
      }
    })
    console.log("value in walletAlreadyExists Prisma method", value)
    return value
  } else{
    console.log("user needs to be investigated", user)
    throw new Error("user error in walletAlreadyTracked method")
  }
}
export async function addWalletToTrack(accountAddress: string, telegramId: string):Promise<null|void>{
  const alreadyTracked = await walletAlreadyTracked(accountAddress, telegramId)
  if(alreadyTracked) {
    return null;
  } else {
    const user = await prisma.user.findUnique({where: {
      telegramId: telegramId,
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
