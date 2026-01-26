// import create from 'zustand';
// import { persist } from 'zustand/middleware';
// import { getUsers } from './app/lib/services/usersApi';

// // Define your store with persistence
// type User = { id: string; username: string; email: string };

// interface UserStore {
//   users: User[];
//   setUsers: (users: User[]) => void;
//   fetchUsers: () => Promise<void>;
//   resetUsers: () => void;
// }

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       users: [],
//       setUsers: (users) => set({ users }),
//       fetchUsers: async () => {
//         const data = await getUsers();
//         set({ users: data });
//       },
//       resetUsers: () => set({ users: [] }),
//     }),
//     { name: 'users-storage' } // stored in localStorage automatically
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./app/components/users/users-columns";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  selectedUser?: User;
  setSelectedUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      selectedUser: undefined,
      setSelectedUser: (user) => set({ selectedUser: user }),
    }),
    { name: "user-store" }
  )
);
