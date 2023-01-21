import React from 'react'
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonBadge,
  IonRouterOutlet,
  IonContent,
} from '@ionic/react'
import {
  personCircle,
  calendar,
  map,
  informationCircle,
  home,
} from 'ionicons/icons'

const Footer: React.FC = () => {
  return (
    <IonContent>
      <IonTabs>
        <IonRouterOutlet></IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} aria-hidden="true" />
            <IonLabel>Schedule</IonLabel>
          </IonTabButton>

          <IonTabButton tab="map">
            <IonIcon icon={map} aria-hidden="true" />
            <IonLabel>Map</IonLabel>
          </IonTabButton>

          <IonTabButton tab="account" href="/account">
            <IonIcon icon={personCircle} aria-hidden="true" />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  )
}

export default Footer
