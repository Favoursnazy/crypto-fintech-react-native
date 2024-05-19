import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

export interface BalanaceState {
  transaction: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

export const useBalance = create<BalanaceState>()(
  persist(
    (set, get) => ({
      transaction: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({ transaction: [...state.transaction, transaction] }));
      },
      balance: () => get().transaction.reduce((acc, t) => acc + t.amount, 0),
      clearTransactions: () => {
        set({ transaction: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
