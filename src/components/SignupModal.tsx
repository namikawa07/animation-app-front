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
  IonText,
} from '@ionic/react'
import { toast } from 'react-toastify'
import {
  auth,
  createWithEmailAndPasswordError,
  signInWithEmailAndPasswordError,
} from '../../src/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

import { signUpUser, SignInUser } from 'slices/profileSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'

import { closeSignupModal } from '../../src/slices/global/signupModalSlice'

interface SignupModalType {
  openPage: { current: any }
  isSignupOpen: boolean
}

const SignupModal: React.FC<SignupModalType> = ({ openPage, isSignupOpen }) => {
  // ------------------- init -------------------
  const dispatch = useDispatch<AppDispatch>()
  // ------------------- init -------------------
  // ------------------- data -------------------
  const modal = useRef<HTMLIonModalElement>(null)
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null)
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
  const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<
    boolean | null
  >(null)
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [currentTab, setCurrentTab] = useState<string>('signup')

  // ------------------- data -------------------
  // ------------------- file cycle  -------------------
  useEffect(() => {
    setCurrentTab('signup')
    setPresentingElement(openPage.current)
  }, [isSignupOpen])
  // ------------------- file cycle  -------------------

  // ------------------- function -------------------
  // ------------------- function main -------------------
  const TabName = () => {
    if (currentTab === 'signin') return 'ログイン'
    if (currentTab === 'signup') return '新規登録'
    if (currentTab === 'reset-password') return 'パスワードリセット'
  }

  const inputUserName = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setUserName(value)
  }

  function dismiss() {
    modal.current?.dismiss()
    dispatch(closeSignupModal())
  }
  // ------------------- function main -------------------
  // ------------------- function validation -------------------
  const validationEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  }

  const validateEmail = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidEmail(null)
    setEmail(value)
    if (value === '') return
    validationEmail(value) !== null
      ? setIsValidEmail(true)
      : setIsValidEmail(false)
  }

  const validatePassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidPassword(null)
    setPassword(value)
    if (value === '') return
    value.length > 5 ? setIsValidPassword(true) : setIsValidPassword(false)
  }

  const validateConfirmPassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidConfirmPassword(null)
    setConfirmPassword(value)
    if (value === '') return
    confirmPassword === password
      ? setIsValidConfirmPassword(true)
      : setIsValidConfirmPassword(false)
  }
  // ------------------- function validation -------------------
  // ------------------- function firebase authentication -------------------
  const firebaseAuthSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const idToken = await userCredential.user?.getIdToken()

        const firebaseAuthParams = {
          refresh_token: userCredential.user.refreshToken,
          access_token: null,
          id_token: idToken,
          tenant_id: userCredential.user.tenantId,
          name: userName,
        }

        dispatch(signUpUser(firebaseAuthParams))
        dispatch(closeSignupModal())
      })
      .catch((error) => {
        // firebaseへの外部接続が失敗した場合
        const errorStr = createWithEmailAndPasswordError(error.code.toString())

        console.log(
          `======================== firebase sign up error ${errorStr}`
        )
        toast.error(errorStr)
      })
  }

  const firebaseAuthSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const firebaseAuthParams = {}
        dispatch(SignInUser(firebaseAuthParams))
        dispatch(closeSignupModal())
      })
      .catch((error) => {
        // firebaseへの外部接続が失敗した場合
        let errorStr = signInWithEmailAndPasswordError(error.code.toString())

        if (!errorStr) errorStr = 'ログイン情報が存在しません'

        console.log(
          `======================== firebase sign in error ${errorStr}`
        )
        toast.error(errorStr)
      })
  }

  const firebaseAuthResetpassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          '記入したアドレスにパスワードリセットのメールを送信しました！'
        )
        // Password reset email sent!
        // ..
      })
      .catch(() => {
        toast.error('記入したメールアドレスが存在しません')
      })
  }
  // ------------------- function firebase authentication -------------------
  // ------------------- function -------------------

  // ------------------- components -------------------
  // ------------------- mini component -------------------
  const userNameInputArea = (
    <IonItem fill="solid">
      <IonLabel position="stacked">ユーザー名</IonLabel>
      <IonInput
        type="text"
        placeholder="ユーザー名"
        onIonInput={(event) => {
          inputUserName(event)
        }}
      ></IonInput>
    </IonItem>
  )

  const EmailInputArea = (
    <IonItem
      fill="solid"
      className={`${isValidEmail && 'ion-valid'} ${
        isValidEmail === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="stacked">メールアドレス</IonLabel>
      <IonInput
        type="email"
        placeholder="email@email.com"
        inputmode="email"
        onIonInput={(event) => validateEmail(event)}
      ></IonInput>
      <IonNote slot="error">メールアドレスの形式で入力してください</IonNote>
    </IonItem>
  )

  const passwordInputArea = (
    <IonItem
      fill="solid"
      className={`${isValidPassword && 'ion-valid'} ${
        isValidPassword === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="stacked">パスワード</IonLabel>
      <IonInput
        type="password"
        placeholder="password"
        onIonInput={(event) => validatePassword(event)}
      ></IonInput>
      <IonNote slot="error">パスワードは6文字以上にしてください</IonNote>
    </IonItem>
  )

  const confirmPasswordInputArea = (
    <IonItem
      fill="solid"
      className={`${isValidConfirmPassword && 'ion-valid'} ${
        isValidConfirmPassword === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="stacked">パスワード確認</IonLabel>
      <IonInput
        type="password"
        placeholder="confirm password"
        onIonInput={(event) => validateConfirmPassword(event)}
      ></IonInput>
      <IonNote slot="error">パスワードと一致していません</IonNote>
    </IonItem>
  )

  const SignupButton = (
    <IonButton
      expand="block"
      color="medium"
      disabled={!userName || !email || !password || !confirmPassword}
      onClick={() => {
        firebaseAuthSignup()
      }}
    >
      {TabName()}
    </IonButton>
  )

  const SigninButton = (
    <IonButton
      expand="block"
      color="medium"
      disabled={!email || !password}
      onClick={() => {
        firebaseAuthSignin()
      }}
    >
      {TabName()}
    </IonButton>
  )

  const resetPasswordButton = (
    <IonButton
      expand="block"
      color="medium"
      disabled={!email}
      onClick={() => {
        firebaseAuthResetpassword()
      }}
    >
      {TabName()}
    </IonButton>
  )

  const AuthFormatUnit = () => {
    if (currentTab === 'signup')
      return (
        <>
          {userNameInputArea}
          {EmailInputArea}
          {passwordInputArea}
          {confirmPasswordInputArea}
        </>
      )

    if (currentTab === 'signin')
      return (
        <>
          {EmailInputArea}
          {passwordInputArea}
        </>
      )

    if (currentTab === 'reset-password') return <>{EmailInputArea}</>
  }

  const authButtonUnit = () => {
    if (currentTab === 'signup') return SignupButton
    if (currentTab === 'signin') return SigninButton
    if (currentTab === 'reset-password') return resetPasswordButton
  }

  // ------------------- mini component -------------------

  // ------------------- main component -------------------

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      presentingElement={presentingElement!}
      isOpen={isSignupOpen}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{TabName()}</IonTitle>
          {currentTab === 'reset-password' ? (
            <IonButtons slot="start">
              <IonButton color="dark" onClick={() => setCurrentTab('signup')}>
                戻る
              </IonButton>
            </IonButtons>
          ) : (
            <></>
          )}
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => dismiss()}>
              閉じる
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {currentTab === 'reset-password' ? (
          <></>
        ) : (
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
        )}

        <IonList>{AuthFormatUnit()}</IonList>
        {currentTab === 'signin' ? (
          <IonText
            onClick={() => {
              setCurrentTab('reset-password')
            }}
          >
            パスワードをお忘れの方はこちら
          </IonText>
        ) : (
          <></>
        )}
        {authButtonUnit()}
      </IonContent>
    </IonModal>
  )
  // ------------------- main component -------------------
  // ------------------- components -------------------
}

export default SignupModal

// ------------------- styled component -------------------
