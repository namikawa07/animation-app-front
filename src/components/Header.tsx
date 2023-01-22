import React, { useState, useEffect } from 'react'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import { useLocation, useHistory } from 'react-router-dom'
import { locationType } from '../../src/types/global'

const Header: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState<string>('ANIMET')

  let BackButton = <></>
  const location = useLocation<locationType>()
  if (location.pathname !== '/home') {
    BackButton = (
      <IonButtons slot="start">
        <IonBackButton text="戻る" defaultHref="/home"></IonBackButton>
      </IonButtons>
    )
  }
  useEffect(() => {
    let title = ''
    switch (location.pathname) {
      case '/home':
        title = 'ANIMET'
        break
      case '/account':
        title = 'ANIMET'
        break
      case '/account/userSetting':
        title = 'プロフィールを編集'
        break
      default:
        title = 'ANIMET'
    }

    const path: string = location.pathname
    setHeaderTitle(title)
  }, [location])

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          {BackButton}
          <IonButtons slot="end">
            <IonButton color="medium" id="open-modal">
              <IonIcon slot="icon-only" ios={personCircle} md={personCircle} />
            </IonButton>
          </IonButtons>
          <IonTitle>{headerTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  )
}

export default Header
