'use client'
import Icon from '@mdi/react';

import { mdiCloseOctagon, mdiPencil, mdiTrashCanOutline } from '@mdi/js';
import addTodo from './actions/addTodo';
import { FormEventHandler, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { coreMakeGetRequest } from './utilities/functions';
import fetchTodo from './actions/getTodo';
import { todosData } from './actions/data';
import { FormData } from 'node-fetch';
import { useRouter } from 'next/navigation';

export default function Home() {

  const [todos, setTodos] = useState(todosData);


const [newTask, setNewTask] = useState('')
const router = useRouter()

const handlerSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault()
  await addTodo(newTask)
  setShow(false)
  setNewTask('')
  router.refresh()
}
  

  const [show, setShow] = useState(false)

 

  return (
    <div className="flex justify-center items-center mt-10 w-screen bg-white">
            <div className="flex flex-col border w-[40%] items-center justify-center">
                <h3 className="text-center">
                    TODO LIST
                </h3>
                <button className="bg-blue-700 w-full text-white rounded" onClick={() =>setShow(true)}>Add New Todo</button>
                <table className="w-full border">
                  <thead>
                    <tr className="flex justify-between text-start w-full border">
                      <th >TASK</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        
                      todos.map( (todo: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                        <tr key={todo.id} className="flex justify-between text-start w-full border">
                      <td>{todo.name}</td>
                      <td className='flex gap-1'>
                        
                            <Icon path={mdiTrashCanOutline} size={1} 
                          horizontal
                          color="red"
                          />
                          
                      
                      <Icon path={mdiPencil} size={1} horizontal
                      vertical
                      rotate={180}
                      color="red"
                     />

                      </td>
                    </tr>
                      ))
                    }
                    
                  </tbody>
                </table>

                <div className={`border absolute ${show ? 'flex' : 'hidden'} justify-center items-center bg-slate-400 bg-opacity-35 top-0 bottom-0 z-10 w-screen h-screen`}>
                  <div className="p-4 bg-white  rounded-md  relative   z-50">
                    <button onClick={()=> setShow(false)}>
                      <Icon  className='absolute top-4 right-4' path={mdiCloseOctagon} size={1} />
                    </button>

                    <form onSubmit={handlerSubmit}>
                      <div className="flex flex-col items-center justify-center ">
                        <h2 className='text-center'>Add new task</h2>
                        <div className='flex gap-1 w-full'>
                          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} type="text" name="name" placeholder='type here' className='px-4 border  border-e-rose-900 rounded border-opacity-60 hover:border-blue-600' />
                          <button className='p-2 bg-blue-600 rounded text-white'>submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

            </div>
    </div>
);
}
