import { PrismaClient } from "@prisma/client";

export const Prisma = new PrismaClient();
Prisma.$connect().then(()=>
{
    console.log("Connected to Prisma");
} ).catch((err)=>{
    console.error("Error connecting to Prisma", err );
});
