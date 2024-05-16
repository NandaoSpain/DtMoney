import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt?: string
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      },
    })
    let filteredTransactions = response.data

    if (query) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: Transaction) =>
          transaction.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    filteredTransactions.sort(
      (a: Transaction, b: Transaction) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    setTransactions(filteredTransactions)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date().toISOString(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
