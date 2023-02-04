import UserIcon from './Icon'
import UserLabel from './Label'
import styled from "styled-components"

const UserListItem: React.FC = () => {

  const Wrapper = styled.div`
  display: flex;
  align-items: center;
  `

  return (
    <Wrapper>
      <UserIcon />
      <UserLabel />
    </Wrapper>
  )
}

export default UserListItem
