import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from '../../assets/Logo.svg'

export function Header() {
  return (
    <div>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="" />
          <NewTransactionButton>New Transaction</NewTransactionButton>
        </HeaderContent>
      </HeaderContainer>
    </div>
  )
}