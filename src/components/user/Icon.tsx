import { IonAvatar, IonItem } from '@ionic/react'
import styled from 'styled-components'

const UserIcon: React.FC = () => {
  return (
    <UserIconWrapper>
      <UserIconInner>
        <UserIconAvatar src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
      </UserIconInner>
    </UserIconWrapper>
  )
}

export default UserIcon

const UserIconWrapper = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(#ffe7ac, #e2907d);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const UserIconInner = styled.div`
  width: 46px;
  height: 46px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const UserIconAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`
