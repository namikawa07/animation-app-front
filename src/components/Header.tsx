import React, { useState, useEffect } from 'react'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonMenuToggle,
  IonImg,
} from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { locationType } from '../../src/types/global'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch } from '../store'
import { openSignupModal } from '../../src/slices/global/signupModalSlice'

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const profileState: any = useSelector((state: any) => {
    return state.profileState
  })

  const [headerTitle, setHeaderTitle] = useState<string>('')

  const location = useLocation<locationType>()

  const clickAccount = () => {
    if (profileState.profile && profileState.profile.uuid !== '')
      dispatch(openSignupModal())
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
          {profileState.profile && profileState.profile.uuid !== '' ? (
            <IonButtons slot="end">
              <IonMenuToggle>
                <IonImg src="assets/icon/account.svg"></IonImg>
              </IonMenuToggle>
            </IonButtons>
          ) : (
            <IonButtons slot="end" onClick={clickAccount}>
              <img src="assets/icon/account.svg" />
            </IonButtons>
          )}
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
