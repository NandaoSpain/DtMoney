import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions',{
      params: {
        q: query,
      }
    })
    let filteredTransactions = response.data

    if (query) {
      filteredTransactions = filteredTransactions.filter((transaction: Transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    setTransactions(filteredTransactions)
    console.log(filteredTransactions)
  }
  useEffect(() =>{
    fetchTransactions()
  }, [])

  return(
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions, 
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
