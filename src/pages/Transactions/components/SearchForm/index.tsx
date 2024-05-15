import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContext } from "react";

const searchFormSchema = z.object({
  query: z.string()
})

type searchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: searchFormInputs) {
    await fetchTransactions(data.query)
  }
  
  return (
    <div>
      <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
        <input 
          type="text"  
          placeholder="Search for transations"
          {...register('query')}
        />
        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20}/>
          Search
        </button>
      </SearchFormContainer>
    </div>
  )
}
