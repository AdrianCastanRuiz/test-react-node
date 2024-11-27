import { setup, fromPromise } from "xstate";
import { fetchUserById } from "../services/api";
import { User } from "../types/User";


export const userDetailMachine = setup({
  types: {
    context: {} as {
      user: User | null;
      error: string | null;
      id: string | null;
    },
    events: {} as { type: 'RETRY' },
    input: {} as { id: string }
  },
  actors: {
    fetchUser: fromPromise(({ input }) => {
      return fetchUserById(Number(input))
    })
  },
  actions: {
    setUser: ({ context, event }) => {
      if ('output' in event) {
        context.user = event.output as User;
        context.error = null;
      }
    },
    setError: ({ context, event }) => {
      if ('error' in event) {
        context.error = String(event.error);
        context.user = null;
      }
    }
  },
}).createMachine({
  id: "userDetail",
  initial: "loading",
  context: ({ input }) => ({
    user: null,
    error: null,
    id: input.id
  }),
  states: {
    loading: {
      invoke: {
        src: 'fetchUser',
        input: ({ context }) => context.id,
        onDone: {
          target: "success",
          actions: 'setUser'
        },
        onError: {
          target: "failure",
          actions: 'setError'
        }
      }
    },
    success: {
      type: "final"
    },
    failure: {
      on: {
        RETRY: "loading"
      }
    }
  }
});