import React, { useState, useRef, useEffect } from 'react'
import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonNote,
} from '@ionic/react'

interface SignupModalType {
  openPage: { current: any }
  isSignupOpen: boolean
  closeSignupModal: any
}

const SignupModal: React.FC<SignupModalType> = ({ openPage, isSignupOpen, closeSignupModal }) => {
  const modal = useRef<HTMLIonModalElement>(null)
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null)
  const [isValidEmail, setIsValidEmail] = useState<boolean>()
  const [isValidPassword, setIsValidPassword] = useState<boolean>()
  const [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>()
  const [userName, setUserName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [currentTab, setCurrentTab] = useState<string | null>('signup')

  const validationEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  }

  const validateEmail = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidEmail(undefined)
    setEmail(value)
    if (value === '') return
    validationEmail(value) !== null
      ? setIsValidEmail(true)
      : setIsValidEmail(false)
  }

  const validatePassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidPassword(undefined)
    setPassword(value)
    if (value === '') return
    value.length > 5 ? setIsValidPassword(true) : setIsValidPassword(false)
  }

  const validateConfirmPassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidConfirmPassword(undefined)
    setConfirmPassword(value)
    if (value === '') return
    confirmPassword === password
      ? setIsValidConfirmPassword(true)
      : setIsValidConfirmPassword(false)
  }

  const inputUserName = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setUserName(value)
  }

  function dismiss() {
    modal.current?.dismiss()
    closeSignupModal()
  }

  useEffect(() => {
    setPresentingElement(openPage.current)
  }, [])

  const userNameIonItem = (
    <IonItem fill="solid">
      <IonLabel position="floating">ユーザー名</IonLabel>
      <IonInput
        type="text"
        placeholder="ユーザー名"
        onIonInput={(event) => {
          inputUserName(event)
        }}
      ></IonInput>
    </IonItem>
  )

  const confirmPasswordIonItem = (
    <IonItem
      fill="solid"
      className={`${isValidConfirmPassword && 'ion-valid'} ${
        isValidConfirmPassword === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="floating">パスワード確認</IonLabel>
      <IonInput
        type="password"
        placeholder="confirm password"
        onIonInput={(event) => validateConfirmPassword(event)}
      ></IonInput>
      <IonNote slot="error">パスワードと一致していません</IonNote>
    </IonItem>
  )

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      presentingElement={presentingElement!}
      isOpen={isSignupOpen}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>ログイン</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => dismiss()}>
              閉じる
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSegment
          color="secondary"
          value={currentTab}
          onIonChange={(e) => {
            setCurrentTab(e.detail.value!)
          }}
        >
          <IonSegmentButton value="signup">
            <IonLabel>新規登録</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="signin">
            <IonLabel>ログイン</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList>
          {currentTab === 'signup' ? userNameIonItem : <></>}
          <IonItem
            fill="solid"
            className={`${isValidEmail && 'ion-valid'} ${
              isValidEmail === false && 'ion-invalid'
            }`}
          >
            <IonLabel position="floating">メールアドレス</IonLabel>
            <IonInput
              type="email"
              placeholder="email@email.com"
              onIonInput={(event) => validateEmail(event)}
            ></IonInput>
            <IonNote slot="error">
              メールアドレスの形式で入力してください
            </IonNote>
          </IonItem>
          <IonItem
            fill="solid"
            className={`${isValidPassword && 'ion-valid'} ${
              isValidPassword === false && 'ion-invalid'
            }`}
          >
            <IonLabel position="floating">パスワード</IonLabel>
            <IonInput
              type="password"
              placeholder="password"
              onIonInput={(event) => validatePassword(event)}
            ></IonInput>
            <IonNote slot="error">パスワードは6文字以上にしてください</IonNote>
          </IonItem>
          {currentTab === 'signup' ? confirmPasswordIonItem : <></>}
        </IonList>
        <IonButton expand="block" color="medium">
          {currentTab === 'signup' ? '新規登録' : 'ログイン'}
        </IonButton>
      </IonContent>
    </IonModal>
  )
}

export default SignupModal
