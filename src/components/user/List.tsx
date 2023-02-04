import { IonContent } from '@ionic/react'
import styled from 'styled-components'

import UserListItem from './ListItem'

const UserList: React.FC = () => {
  const UserListIonContent = styled(IonContent)`
    height: 100vh;
    --padding-top: 44px;
  `
  return (
    <UserListIonContent>
      <UserListItem></UserListItem>
    </UserListIonContent>
  )
}

export default UserList
