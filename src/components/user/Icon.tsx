import { IonAvatar, IonItem } from '@ionic/react'
import styled from 'styled-components'

function UserIcon(props: any) {
  const { srcUrl } = props
  return (
    <UserIconWrapper>
      <img
        src="assets/icon/user-icon-wrapper.svg"
        referrerPolicy="no-referrer"
      ></img>
      <UserIconAvatar src={srcUrl} />
    </UserIconWrapper>
  )
}

export default UserIcon

const UserIconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const UserIconAvatar = styled.img`
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(100% - 6px) !important;
  border-radius: 50%;
`
