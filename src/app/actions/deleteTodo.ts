'use client'

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient()

export default async function deleteTodo(formData : FormData) {
    const idValue = formData.get('id');

    if (typeof idValue === 'string') {
    const id = parseInt(idValue, 10);

    try {

        await prisma.todo.delete({
            where : {
                id
            }
        })

        revalidatePath('/')
        
    } catch (error) {
        console.log('erreur :', error)
    }

    } else {
    throw new Error('The ID value is not a string.');
    }


  
}