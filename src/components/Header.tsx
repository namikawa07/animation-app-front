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
import { searchOutline } from 'ionicons/icons'
import { useLocation } from 'react-router-dom'
import { locationType } from '../../src/types/global'
import './Header.css'
import SearchList from './SearchList'
import styled from 'styled-components'

const Header: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState<string>('moon')
  const [isDisplaySearch, setIsDisplaySearch] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  const [isSearchModalOpen, setIsSearchListOpen] = useState<boolean>(false)

  const closeSearchModal = () => {
    setIsSearchListOpen(false)
  }
  /*
  const HeaderIonHeader = styled(IonHeader)`
    position: relative;
  `

  const HeaderSearchBarIonSearchbar = styled(IonSearchbar)`
    padding-top: 12px;
  `

  const HeaderSearchListIonContent = styled(IonContent)`
    height: calc(100vh / 2);
  `
  */

  let BackButton = <></>
  const location = useLocation<locationType>()
  if (location.pathname !== '/home') {
    BackButton = (
      <IonButtons slot="start">
        <IonBackButton
          color="medium"
          text=""
          defaultHref="/home"
        ></IonBackButton>
      </IonButtons>
    )
  }
  useEffect(() => {
    let title = ''
    switch (location.pathname) {
      case '/home':
        title = 'moon'
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
        title = 'moon'
    }

    const path: string = location.pathname
    setHeaderTitle(title)
    setIsDisplaySearch(false)
  }, [location])

  return (
    <>
      <IonHeader translucent>
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
              showClearButton="always"
              showCancelButton="always"
              cancelButtonText="閉じる"
              debounce={1000}
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
          <IonContent>
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
