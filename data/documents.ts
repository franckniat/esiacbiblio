import { db } from "@/lib/db";

export const getAllDocuments = async()=>{
    const data =  await db.document.findMany();
    return data;
}

export const getActiveDocuments = async()=>{
    const data = await db.document.findMany({
        where:{
            isVisible:true
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    return data;
}

export const getUserDocuments = async(userId:string)=>{
    const data = await db.document.findMany({
        where:{
            user:{
                id:userId
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    return data;
}

export const getDocumentById = async(id:string)=>{
    const data = await db.document.findUnique({
        where:{
            id
        }
    });
    return data;
}