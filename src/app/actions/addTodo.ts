
import { revalidatePath } from "next/cache"
import { coreMakePostRequest } from "../utilities/functions"
import { HookCallbacks } from "async_hooks"
import { RefCallback } from "react"



export default async function addTodo (newTask: string) {
    
    if (typeof newTask === 'string') {

        const data = {
            name: newTask
        }

        try {
            await coreMakePostRequest({
                endpoint: '/api/task',
                data: JSON.stringify(data)
            })

        } catch (error) {
            console.log('erreur :', error)
        } 

    }else{
        throw new Error('The name value is not a string.');
    }

    
}