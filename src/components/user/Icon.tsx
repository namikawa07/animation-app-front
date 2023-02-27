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
  width: 100%;
  height: 100%;
  background: linear-gradient(#ffe7ac, #e2907d);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const UserIconInner = styled.div`
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const UserIconAvatar = styled.img`
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border-radius: 50%;
`
