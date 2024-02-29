//We are going to use this file to connect with database.
import { PrismaClient } from "@prisma/client";
let prisma:PrismaClient;

if(process.env.NODE_ENV === "production")
{
    prisma = new PrismaClient();
}else{
    //@ts-ignore
    if(!global.prisma)
    {
        //@ts-ignore
        global.prisma = new PrismaClient();
    }
    //@ts-ignore
    prisma = global.prisma;
}
// The above code makes sure that only one instance of prisma client exist in the application.
export default prisma;