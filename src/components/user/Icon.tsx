import { IonAvatar, IonItem } from '@ionic/react'
import styled from 'styled-components'

const UserIcon: React.FC = () => {
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

  const UserIconAvatarIonAvatar = styled(IonAvatar)`
    width: 44px;
    height: 44px;
  `
  return (
    <IonItem lines="none">
      <UserIconWrapper>
        <UserIconInner>
          <UserIconAvatarIonAvatar>
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </UserIconAvatarIonAvatar>
        </UserIconInner>
      </UserIconWrapper>
    </IonItem>
  )
}

export default UserIcon
