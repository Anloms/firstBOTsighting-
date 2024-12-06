
import prisma from '../../prisma/prismaClient.js';

export async function createUser(userId: string) {
   await prisma.user.create({
    data: {
      telegramId: userId,
    },
  });
  return
}

export async function userExists(telegramId: string) {
   await prisma.user.findUnique({
    where: { telegramId },
  });
  return
}
