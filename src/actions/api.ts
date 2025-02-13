'use server'
import { revalidatePath } from "next/cache"
import { todoProps } from "@/types"




export const addTodo =  async  (name: string) =>{

    if( typeof name == 'string'){
      console.log(typeof name)
  
    const data ={
      name : name
    }
      try {
      
        const res = await fetch(
            'http://localhost:3000/api/task',{
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            });
          const todo = res.json()

          if(await !todo){
            return 
          }
          const todos = await fetchTodo()
        revalidatePath('/', 'layout')
  
        return todos 
      } catch (error) {
        console.log('erreur :', error)
        
      }
      
      
    }

    
}

export const deleteTodo =  async  (id: string) =>{

  if( typeof id == 'string'){

    try {
    
      const res = await fetch(
          `http://localhost:3000/api/task/${id}`,{
              method : 'DELETE',
              headers: {
                  'Content-Type' : 'application/json'
              },
          });
        const todo = await res.json()

        if(!todo){
          return 
        }
        const todos = await fetchTodo()
      revalidatePath('/', 'layout')

      return todos 
    } catch (error) {
      console.log('erreur :', error)
      
    }
    
    
  }

  
}


export const updateTodo =  async  (id: string, name: string) =>{


    try {

      const data = {
        name : name
      }
    
      const res = await fetch(
          `http://localhost:3000/api/task/${id}`,{
              method : 'PATCH',
              headers: {
                  'Content-Type' : 'application/json'
              },
              body: JSON.stringify(data)
          });

        const todos = await fetchTodo()
      revalidatePath('/', 'layout')

      return todos
    } catch (error) {
      console.log('erreur :', error)
      
    }
    

  
}


export const fetchTodo = async   () : Promise<todoProps[]> =>{

  const res = await fetch('http://localhost:3000/api/task', { cache: 'force-cache'});
  const todo = res.json()
  
      return todo
}

