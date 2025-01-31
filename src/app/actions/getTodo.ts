import { coreMakeGetRequest } from "../utilities/functions";

export default async function fetchTodo(){

    const todosValue = await coreMakeGetRequest({
      endpoint: '/api/task',
    });

    if(todosValue.data!=null)
        return todosValue.data
  }