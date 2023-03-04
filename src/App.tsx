import { useRef, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonImg,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Home from './pages/Home'
import Account from './pages/Account'
import AccountDetail from './pages/AccountDetail'
import Header from '../src/components/Header'
import Notice from './pages/Notice'
import SignupModal from '../src/components/SignupModal'

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
import './App.css'
import CreatePostModal from './components/CreatePostModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyProfile } from 'slices/profileSlice'
import { AppDispatch } from './store'
import styled from 'styled-components'

import { openSignupModal } from '../src/slices/global/signupModalSlice'

setupIonicReact()

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const profileState: any = useSelector((state: any) => {
    return state.profileState
  })

  const globalSignupModalState: any = useSelector((state: any) => {
    return state.globalSignupModalState
  })

  useEffect(() => {
    dispatch(fetchMyProfile())
  }, [dispatch])

  useEffect(() => {
    setIsSignupOpen(globalSignupModalState.isOpen)
  }, [globalSignupModalState])

  const page = useRef(null)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] =
    useState<boolean>(false)
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false)

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false)
  }

  const currentUserPresent =
    profileState.profile &&
    profileState.profile.uuid &&
    profileState.profile.uuid !== ''

  const clickCreatePostButton = () => {
    if (currentUserPresent) {
      setIsCreatePostModalOpen(true)
    } else {
      dispatch(openSignupModal())
    }
  }

  return (
    <IonApp>
      <IonPage ref={page} id="main-content">
        <IonReactRouter>
          <Header></Header>
          <SignupModal
            openPage={page}
            isSignupOpen={isSignupOpen}
          ></SignupModal>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/notice" component={Notice} />
              <Route exact path="/account/detail" component={AccountDetail} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonImg src="assets/icon/home.svg"></IonImg>
              </IonTabButton>
              <IonTabButton tab="" onClick={() => clickCreatePostButton()}>
                <IonImg src="assets/icon/create.svg"></IonImg>
              </IonTabButton>
              {currentUserPresent ? (
                <IonTabButton tab="notice" href="/notice">
                  <IonImg src="assets/icon/bell.svg"></IonImg>
                </IonTabButton>
              ) : (
                <IonTabButton
                  tab="notice"
                  onClick={() => {
                    dispatch(openSignupModal())
                  }}
                >
                  <IonImg src="assets/icon/bell.svg"></IonImg>
                </IonTabButton>
              )}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          closeModal={closeCreatePostModal}
        ></CreatePostModal>
      </IonPage>
      <IonMenu side="end" type="push" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
    </IonApp>
  )
}

export default App
