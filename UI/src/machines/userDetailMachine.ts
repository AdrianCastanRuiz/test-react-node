import { createMachine, assign } from 'xstate';

interface Company {
  name: string;
  department: string;
}

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  emailVerified: boolean;
  dob: string;
  company: Company;
  skills: string[];
}



export const userDetailMachine = createMachine({
  id: 'userDetail',
  initial: 'loading',
  context: {
    user: null as User | null, 
    error: null as string | null,
  },
  states: {
    loading: {
      invoke: {
        src: 'fetchUser',
        onDone: {
          target: 'success',
          actions: assign({
            user: (_, event) => (event as unknown as { data: User }).data, 
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
