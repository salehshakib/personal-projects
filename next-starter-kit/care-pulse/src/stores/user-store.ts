import { types } from 'mobx-state-tree';

import { initId } from '@/utils/constants';

import type { SnapshotOut } from 'mobx-state-tree';

/**
 * User Store
 */

const UserStore = types
  .model('UserStore', {
    id: types.identifierNumber,
    uid: types.number,
    uuid: types.string,
    name: types.string,
    last_seen: types.maybeNull(types.string),
    ip_address: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    email_verify: types.union(types.literal('unverified'), types.literal('verified')),
    country: types.maybeNull(types.string),
    city: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    country_code: types.maybeNull(types.string),
    phone_number: types.string,
    phone_number_verify: types.union(types.literal('unverified'), types.literal('verified')),
    dob: types.maybeNull(types.string),
    status: types.union(types.literal('active'), types.literal('pending'), types.literal('block')),
    account_verify: types.union(types.literal('unverified'), types.literal('verified')),
    my_reffer_code: types.maybeNull(types.string),
    referral_by_code: types.maybeNull(types.string),
    reffrral_by_id: types.maybeNull(types.number),
    createdAt: types.maybeNull(types.string),
    updatedAt: types.maybeNull(types.string),
    deletedAt: types.maybeNull(types.string),
    profile_image: types.maybeNull(
      types.model({
        path: types.string,
      })
    ),
    // Close Account flag
    close_account: types.maybe(types.boolean),
  })
  .actions((self) => ({
    setCloseAccount(value: boolean) {
      self.close_account = value;
    },
  }))
  .views((self) => ({
    get dobDate() {
      return self.dob ? new Date(self.dob) : null;
    },
    get prefixedUid() {
      return initId + self.uid;
    },
  }));

export type UserData = SnapshotOut<typeof UserStore>;

export default UserStore;
