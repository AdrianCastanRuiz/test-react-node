// src/machines/userListMachine.ts
import { createMachine, assign } from 'xstate';

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface UserListContext {
  users: User[];
  error: string | null;
}

export const userListMachine = createMachine({
  id: 'userList',
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
          actions: assign({ users: (_, event) => event.data }),
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    success: {},
    failure: {},
  },
});
