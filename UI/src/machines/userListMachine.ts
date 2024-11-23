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

type UserListEvent =
  | { type: 'done.invoke.fetchUsers'; data: User[] }
  | { type: 'error.platform.fetchUsers'; data: string };

export const userListMachine = createMachine({
  id: 'userList',
  initial: 'loading',
  context: {
    users: [] as User[], 
    error: null as string | null,
  },
  states: {
    loading: {
      invoke: {
        src: 'fetchUsers',
        onDone: {
          target: 'success',
          actions: assign({
            users: (_, event) => (event as unknown as { data: User[] }).data, 
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (_, event) => (event as unknown as { data: string }).data, 
          }),
        },
      },
    },
    success: {},
    failure: {},
  },
});
