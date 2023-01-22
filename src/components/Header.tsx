import React from 'react'
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
  let BackButton = <></>
  const location = useLocation<locationType>()
  if (location.pathname === '/account') {
    BackButton = (
      <IonButtons slot="start">
        <IonBackButton text="戻る" defaultHref="/home"></IonBackButton>
      </IonButtons>
    )
  }

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
          <IonTitle>ANIMET</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  )
}

export default Header
