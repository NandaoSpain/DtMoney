import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string().min(3).max(100)
})

type searchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: searchFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
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
