import React, { useState, useEffect } from 'react'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonContent,
} from '@ionic/react'
import { searchOutline, closeCircleOutline } from 'ionicons/icons'
import { useLocation, useHistory } from 'react-router-dom'
import { locationType } from '../../src/types/global'
import './Header.css'
import SearchList from './SearchList'

const Header: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState<string>('ANIMET')
  const [isDisplaySearch, setIsDisplaySearch] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  const [isSearchModalOpen, setIsSearchListOpen] = useState<boolean>(false)

  const closeSearchModal = () => {
    setIsSearchListOpen(false)
  }

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
        title = 'アカウント'
        break
      case '/account/userSetting':
        title = 'プロフィールを編集'
        break
      case '/notice':
        title = 'お知らせ'
        break
      default:
        title = 'ANIMET'
    }

    const path: string = location.pathname
    setHeaderTitle(title)
    setIsDisplaySearch(false)
  }, [location])

  return (
    <>
      <IonHeader translucent className="header">
        <IonToolbar>
          {BackButton}
          <IonButtons slot="end">
            {isDisplaySearch ? (
              <></>
            ) : (
              <IonButton
                color="dark"
                onClick={() => {
                  setIsDisplaySearch(true)
                }}
              >
                <IonIcon slot="icon-only" icon={searchOutline} />
              </IonButton>
            )}
          </IonButtons>
          {isDisplaySearch ? (
            <IonSearchbar
              className="search"
              showClearButton="always"
              showCancelButton="always"
              cancelButtonText="閉じる"
              debounce={1000}
              animated
              onIonCancel={() => {
                setIsDisplaySearch(false)
              }}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              onIonFocus={() => {
                setIsSearchListOpen(true)
              }}
              onIonBlur={() => {
                setIsSearchListOpen(false)
              }}
            ></IonSearchbar>
          ) : (
            <IonTitle>{headerTitle}</IonTitle>
          )}
        </IonToolbar>
        {isSearchModalOpen ? (
          <IonContent className="search">
            <SearchList></SearchList>
          </IonContent>
        ) : (
          <></>
        )}
      </IonHeader>
    </>
  )
}

export default Header
