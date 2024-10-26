import { flow, types } from 'mobx-state-tree';
import merge from 'mst-persistent-store/dist/utils/merge';

import { get } from '@/api';
import UserStore from '@/stores/user-store';

import type { UserData } from '@/stores/user-store';

/**
 * Example of a Appwide Global Store
 */

const RootStore = types
  .model('RootStore', {
    // User Store
    user: types.maybeNull(UserStore),
    token: types.maybe(types.string),
    userColorScheme: types.maybeNull(types.union(types.literal('light'), types.literal('dark'))),
    hydrated: false,
  })
  .actions((self) => ({
    setUserColorScheme(colorScheme: typeof self.userColorScheme | 'auto') {
      if (colorScheme === 'auto') {
        self.userColorScheme = null;
      } else {
        self.userColorScheme = colorScheme;
      }
    },
    logIn(user: UserData, token: string) {
      // @ts-expect-error - This is a valid assignment, TS is just confused.
      self.user = user;
      self.token = token;
    },
    updateUser(user: Partial<UserData>) {
      if (self.user) {
        self.user = merge(self.user, user);
      }
    },
    logOut() {
      self.user = null;
      self.token = undefined;
    },
    hydrate: flow(function* hydrate() {
      try {
        // Hydrate User if token is present
        if (self.user && self.token) {
          // Hit the IP Address API
          yield get('/app/user/ip', undefined, self.token);
          // Refresh User
          const res = yield get('/app/user', undefined, self.token);
          self.user = merge(self.user, res.user);
        }
        // Set Hydrated to true if it's not already
        if (!self.hydrated) {
          self.hydrated = true;
        }
      } catch (error) {
        // Log out if there is an error
        self.user = null;
        self.token = undefined;
        console.error(error);
        self.hydrated = true;
      }
    }),
  }))
  .views((self) => ({
    get currentColorScheme() {
      if (self.userColorScheme) {
        return self.userColorScheme;
      }
      return 'auto';
    },
  }));

export default RootStore;
