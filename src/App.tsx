import { useRef, useState, useEffect } from 'react'
import { useLocation, Route, Redirect } from 'react-router-dom'
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonPage,
} from '@ionic/react'
import {
  personCircle,
  map,
  home,
} from 'ionicons/icons'
import { IonReactRouter } from '@ionic/react-router'
import Home from './pages/Home'
import Account from './pages/Account'
import Header from '../src/components/Header'
import SignupModal from '../src/components/SignupModal'
import UserSetting from '../src/components/user/settings'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { RefresherEventDetail } from '@ionic/core'
import styled from 'styled-components'
import { locationType } from '../src/types/global'
setupIonicReact()

function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log('Begin async operation')

  setTimeout(() => {
    console.log('Async operation has ended')
    event.detail.complete()
  }, 2000)
}

const App: React.FC = () => {
  const page = useRef(null)

  return (
    <IonApp>
      <IonPage ref={page}>
        <IonReactRouter>
          <Header></Header>
          <SignupModal openPage={page}></SignupModal>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/account/user" component={UserSetting} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home" >
                <IonIcon icon={home} aria-hidden="true" />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="map" href="/test1">
                <IonIcon icon={map} aria-hidden="true" />
                <IonLabel>Map</IonLabel>
              </IonTabButton>

              <IonTabButton tab="account" href="/account" >
                <IonIcon icon={personCircle} aria-hidden="true" />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonPage>
    </IonApp>
  )
}

export default App
