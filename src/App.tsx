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
  IonContent,
  IonFab,
  IonFabButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonItem,
  IonInput
} from '@ionic/react'
import { personCircle, map, home, add } from 'ionicons/icons'
import { IonReactRouter } from '@ionic/react-router'
import Home from './pages/Home'
import Account from './pages/Account'
import Header from '../src/components/Header'
import SignupModal from '../src/components/SignupModal'
import AccountUserSetting from './components/account/userSetting'

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
import { OverlayEventDetail } from '@ionic/core/components';
import Example from '../src/components/createModal'
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
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false)
  }


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
              <Route
                exact
                path="/account/userSetting"
                component={AccountUserSetting}
              />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} aria-hidden="true" />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton />
              <IonTabButton tab="account" href="/account">
                <IonIcon icon={personCircle} aria-hidden="true" />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => setIsOpen(true)}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
          <Example isOpen={isOpen} closeModal={closeModal}></Example>
      </IonPage>
    </IonApp>
  )
}

export default App
