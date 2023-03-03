import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { locationType } from '../../src/types/global'
import './Header.css'
import styled from 'styled-components'

const Header: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState<string>('')

  const location = useLocation<locationType>()
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
  }, [location])

  return (
    <>
      <IonHeader translucent>
        <HomeIonToolbar>
          <IonButtons slot="start">
            {location.pathname === '/home' ||
            location.pathname === '/notice' ? (
              <img src="assets/icon/logo.svg" />
            ) : (
              <IonBackButton
                color="medium"
                text=""
                defaultHref="/home"
              ></IonBackButton>
            )}
          </IonButtons>
          <IonButtons slot="center">
            <span>{headerTitle}</span>
          </IonButtons>
          <SearchIonButtons slot="end">
            <SearchImg src="assets/icon/search.svg" />
          </SearchIonButtons>
          <IonButtons slot="end">
            <img src="assets/icon/account.svg" />
          </IonButtons>
        </HomeIonToolbar>
      </IonHeader>
    </>
  )
}

export default Header

const HomeIonToolbar = styled(IonToolbar)`
  padding: 0px 8px;
`

const SearchIonButtons = styled(IonButtons)`
  margin-right: 24px;
`

const SearchImg = styled.img`
  width: 28px;
  height: 28px;
`
