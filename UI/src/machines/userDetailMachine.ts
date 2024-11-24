import { setup, fromPromise, assign } from 'xstate';
import { fetchUserById } from '../services/api';

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  emailVerified: boolean;
  company: {
    name: string;
    department: string;
  };
  skills: Array<string>;
}

export const userDetailsMachine = setup({
  types: {
    context: {} as {
      userId: string;
      user: User | null;
      error: string | null;
    },
    input: {} as {
      userId: string;
    },
    events: {} as
      | { type: 'FETCH' }
      | { type: 'RETRY' }
      | { type: 'UPDATE_USER_ID'; userId: string },
  },
  actors: {
    fetchUser: fromPromise(async ({ input }) => {
      if(!input) return null;
      const user = await fetchUserById(input.userId);
      return user;
    }),
  },
}).createMachine({
  id: 'user',
  initial: 'idle',
  context: {
    userId: '',
    user: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        UPDATE_USER_ID: {
          actions: assign({
            userId: ({event: {userId}}) => {
              return userId;
            },
          }),
          target: 'loading'
        },
      },
    },
    loading: {
      invoke: {
        id: 'fetchUser',
        src: 'fetchUser',
        input: ({ context: { userId } }) => ({ userId }),
        onDone: {
          target: 'success',
          actions: assign({ user: ({ event }) => event.output, error: null }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({ event }) => `Error loading user data. Reason: ${event.error}`,
            user: null,
          }),
        },
      },
    },
    success: {
      type: 'final',
    },
    failure: {
      on: {
        RETRY: { target: 'loading' },
      },
    },
  },
});