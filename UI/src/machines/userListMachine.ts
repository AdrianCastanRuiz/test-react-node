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
      error: null as string | null,
    },
  },
  actors: {
    fetchUsers: fromPromise(async () => {
      try {
        const users = await fetchUsers();
        console.log('Fetched users:', users); 
        return users;
      } catch (error) {
        console.error('Error in fetchUsers:', error); 
        throw error; 
      }
    }),
  },
}).createMachine({
  id: 'user-list',
  initial: 'loading',
  context: {
    users: [],
    error: null,
  },
  states: {
    loading: {
      invoke: {
        src: 'fetchUsers',
        onDone: {
          target: 'success',
          actions: assign({
            users: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({ event }) => {
              console.log('Error received in onError:', event.error); 
              return event.error.message || 'An unknown error occurred';
            },
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
});
