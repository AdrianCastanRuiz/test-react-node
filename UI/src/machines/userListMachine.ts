import { assign, setup, fromPromise } from 'xstate';
import { fetchUsers } from '../services/api';

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export const userListMachine = setup({
  types: {
    context: {
      users: [] as User[],
      error: null as any
    },
  },
  actors: {
    fetchUsers: fromPromise(async ()=>{
      const users = await fetchUsers();
      return users;
    }),
  },
}).createMachine({
  id: 'user-list',
  initial: 'loading',
  context: {
    users: [],
    error: null
  },
  states: {
    loading: {
      invoke:{
        src: 'fetchUsers',
        onDone:{
          target: 'success',
          actions: assign({users: ({event})=> event.output})
        },
        onError: {
          target: 'failure',
          actions: assign({error: ({event})=> event.error})
        }
      }
    },
    success: {},
    failure: {

    }
  }
})