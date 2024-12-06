import { PrismaClient,Prisma } from '@prisma/client';

const prisma = new PrismaClient();
type userInput = Prisma.UserCreateInput

export default prisma;
