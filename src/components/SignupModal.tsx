import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import {
  IonModal,
  IonContent,
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
  IonSlides,
  IonSlide,
  IonThumbnail,
  IonImg,
} from '@ionic/react'
import {
  auth,
  googleProvider,
  createWithEmailAndPasswordError,
  signInWithEmailAndPasswordError,
} from '../../src/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth'

import { signUpUser, SignInUser } from 'slices/profileSlice'
import { closeSignupModal } from '../../src/slices/global/signupModalSlice'
import '../styles/SignupModal.css'

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
  const mySlides = useRef<HTMLIonSlidesElement>(null)

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
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isViewPassword, setIsViewPassword] = useState<boolean>(false)
  const [isViewConfirmPassword, setIsViewConfirmPassword] =
    useState<boolean>(false)

  const slideOpts = {
    initialSlide: currentSlide,
    speed: 400,
  }
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

  const onChangeTab = async (target: string) => {
    setCurrentTab(target)
    const swiper = await mySlides.current?.getSwiper()
    let index = 0
    if (target === 'signup') {
      index = 0
    } else if (target === 'signin') {
      index = 1
    } else if (target === 'reset-password') {
      index = 2
    }
    swiper?.slideTo(index)
    setCurrentSlide(index)
  }

  const onSlideChange = async (ev: any) => {
    let index = 0
    await ev.target.getActiveIndex().then((value: number) => (index = value))

    setCurrentSlide(index)
    if (index === 0) setCurrentTab('signup')
    if (index === 1) setCurrentTab('signin')
    if (index === 2) setCurrentTab('reset-password')
  }

  const setViewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (isViewPassword) {
      setIsViewPassword(false)
    } else {
      setIsViewPassword(true)
    }
  }

  const setViewConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    if (isViewConfirmPassword) {
      setIsViewConfirmPassword(false)
    } else {
      setIsViewConfirmPassword(true)
    }
  }

  const EyeImageSrc = (isView: boolean) => {
    if (isView) return 'assets/icon/eye-off.svg'
    if (!isView) return 'assets/icon/eye.svg'
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
    value.length > 5 || value.length === 0
      ? setIsValidPassword(true)
      : setIsValidPassword(false)
  }

  const validateConfirmPassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    setIsValidConfirmPassword(null)
    setConfirmPassword(value)
    value === password || value.length === 0
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
        window.location.reload()
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
        window.location.reload()
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

  const firebaseAuthGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (userCredential: any) => {
        const idToken = await userCredential.user?.getIdToken()

        const firebaseAuthParams = {
          refresh_token: null,
          access_token: userCredential.user.accessToken,
          id_token: idToken,
          tenant_id: userCredential.user.tenantId,
          name: userCredential.user.displayName,
        }

        dispatch(SignInUser(firebaseAuthParams))
        dispatch(closeSignupModal())
        window.location.reload()
      })
      .catch(() => {
        toast.error('ログインできませんでした。別の方法でお試しください')
      })
  }
  // ------------------- function firebase authentication -------------------
  // ------------------- function -------------------

  // ------------------- components -------------------
  // ------------------- mini component -------------------
  const userNameInputArea = (
    <InputIonItem fill="solid">
      <IonLabel position="floating">ユーザー名</IonLabel>
      <SignupIonInput
        type="text"
        placeholder="ユーザー名"
        onIonInput={(event) => {
          inputUserName(event)
        }}
      ></SignupIonInput>
    </InputIonItem>
  )

  const EmailInputArea = (
    <InputIonItem
      fill="solid"
      className={`${isValidEmail && 'ion-valid'} ${
        isValidEmail === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="floating">メールアドレス</IonLabel>
      <SignupIonInput
        type="email"
        placeholder="email@email.com"
        inputmode="email"
        onIonInput={(event) => validateEmail(event)}
      ></SignupIonInput>
      <IonNote slot="error">メールアドレスの形式で入力してください</IonNote>
    </InputIonItem>
  )

  const passwordInputArea = (
    <InputIonItem
      fill="solid"
      className={`${isValidPassword && 'ion-valid'} ${
        isValidPassword === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="floating">パスワード</IonLabel>
      <SignupIonInput
        type={isViewPassword ? 'text' : 'password'}
        placeholder="password"
        onIonInput={(event) => validatePassword(event)}
      ></SignupIonInput>
      <IonNote slot="error">パスワードは6文字以上にしてください</IonNote>
      <EyeImage
        onClick={(event: any) => {
          setViewPassword(event)
        }}
        src={EyeImageSrc(isViewPassword)}
      ></EyeImage>
    </InputIonItem>
  )

  const confirmPasswordInputArea = (
    <InputIonItem
      fill="solid"
      className={`${isValidConfirmPassword && 'ion-valid'} ${
        isValidConfirmPassword === false && 'ion-invalid'
      }`}
    >
      <IonLabel position="floating">パスワード確認</IonLabel>
      <SignupIonInput
        type={isViewConfirmPassword ? 'text' : 'password'}
        placeholder="confirm password"
        onIonInput={(event) => validateConfirmPassword(event)}
      ></SignupIonInput>
      <IonNote slot="error">パスワードと一致していません</IonNote>
      <EyeImage
        onClick={(event: any) => {
          setViewConfirmPassword(event)
        }}
        src={EyeImageSrc(isViewConfirmPassword)}
      ></EyeImage>
    </InputIonItem>
  )

  const SignupButton = (
    <SignupIonButton
      expand="block"
      disabled={!userName || !email || !password || !confirmPassword}
      onClick={() => {
        firebaseAuthSignup()
      }}
    >
      {TabName()}
    </SignupIonButton>
  )

  const SigninButton = (
    <SignupIonButton
      expand="block"
      disabled={!email || !password}
      onClick={() => {
        firebaseAuthSignin()
      }}
    >
      {TabName()}
    </SignupIonButton>
  )

  const resetPasswordButton = (
    <SignupIonButton
      expand="block"
      disabled={!email || !isValidEmail}
      onClick={() => {
        firebaseAuthResetpassword()
      }}
    >
      {TabName()}
    </SignupIonButton>
  )

  const signupInputArea = () => {
    return (
      <>
        {userNameInputArea}
        {EmailInputArea}
        {passwordInputArea}
        {confirmPasswordInputArea}
      </>
    )
  }

  const signinInputArea = () => {
    return (
      <>
        {EmailInputArea}
        {passwordInputArea}
      </>
    )
  }

  const resetPasswordInputArea = () => {
    return <>{EmailInputArea}</>
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
          <IonTitle color="light">{TabName()}</IonTitle>
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
            <IonButton color="medium" onClick={() => dismiss()}>
              閉じる
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <BackgroundIonContent>
        <BackgroundInnerIonContent>
          <LogoIonItem>
            <LogoIonThumbnail>
              <LogoImg src="assets/icon/logo.svg"></LogoImg>
            </LogoIonThumbnail>
          </LogoIonItem>
          <SignupToggleButtonIonItem>
            <SignupIonSegment
              color="secondary"
              value={currentTab}
              onIonChange={(e) => {
                onChangeTab(e.detail.value!)
              }}
            >
              {currentTab === 'reset-password' ? (
                <IonSegmentButton value={'reset-password'}>
                  <IonLabel>パスワードリセット</IonLabel>
                </IonSegmentButton>
              ) : (
                <IonSegmentButton value="signup">
                  <IonLabel>新規登録</IonLabel>
                </IonSegmentButton>
              )}
              <IonSegmentButton value={'signin'}>
                <IonLabel>ログイン</IonLabel>
              </IonSegmentButton>
            </SignupIonSegment>
          </SignupToggleButtonIonItem>
          <InputAreaIonSlides
            ref={mySlides}
            options={slideOpts}
            onIonSlideDidChange={(e) => onSlideChange(e)}
          >
            <InputAreaIonSlide>{signupInputArea()}</InputAreaIonSlide>
            <InputAreaIonSlide>
              {signinInputArea()}
              <IonItem>
                <PasswordResetIonText
                  onClick={() => {
                    setCurrentTab('reset-password')
                  }}
                >
                  パスワードをお忘れの方はこちら
                </PasswordResetIonText>
              </IonItem>
            </InputAreaIonSlide>
            <InputAreaIonSlide>{resetPasswordInputArea()}</InputAreaIonSlide>
          </InputAreaIonSlides>
          {authButtonUnit()}
          {currentTab === 'reset-password' ? (
            <></>
          ) : (
            <>
              <SignupGoogleIonButton
                expand="block"
                onClick={() => {
                  firebaseAuthGoogle()
                }}
              >
                <GoogleIonImg src="assets/icon/google.svg"></GoogleIonImg>
                Googleで{TabName()}
              </SignupGoogleIonButton>
            </>
          )}
          <InfoIonItem>
            <InfoLink slot="start">プライバシーポリシー</InfoLink>
            <InfoLink slot="end">利用規約</InfoLink>
          </InfoIonItem>
        </BackgroundInnerIonContent>
      </BackgroundIonContent>
    </IonModal>
  )
  // ------------------- main component -------------------
  // ------------------- components -------------------
}

export default SignupModal

// ------------------- styled component -------------------

const InputIonItem = styled(IonItem)`
  --background: none;
  margin: 0px 24px 12px 24px;
  width: 90%;
  border-bottom: 2px solid #b7e7ca;
`

const BackgroundIonContent = styled(IonContent)`
  --background: url('/assets/icon/signup-background-test.png') center center /
    cover no-repeat fixed;
`

const LogoIonItem = styled(IonItem)`
  height: 90px;
  --background: none;
`

const BackgroundInnerIonContent = styled(IonContent)`
  --background: rgba(75, 75, 75, 0.84);
  --overflow: none;
`
const LogoIonThumbnail = styled(IonThumbnail)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`

const LogoImg = styled.img`
  width: 125px;
  margin: 0 auto;
  object-fit: contain;
`
const SignupIonSegment = styled(IonSegment)`
  background: #a7a7a7;
  height: 46px;
  border-radius: 24px;
  padding: 5px;
  width: 290px;
  border: 2px solid #b7e7ca;
  margin: 0 auto 8px auto;
`

const SignupToggleButtonIonItem = styled(IonItem)`
  --background: none;
  --padding-start: 0px;
`

const InputAreaIonSlides = styled(IonSlides)``

const InputAreaIonSlide = styled(IonSlide)`
  flex-flow: column;
  justify-content: flex-start;
`

const SignupGoogleIonButton = styled(IonButton)`
  margin: 18px 24px 0px 24px;
  opacity: 1;
  --background: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.03em;
  --border-radius: 21px;
  --color: #000;
  --background-activated: #4d7d75;
  font-size: 15px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0.02em;
`

const SignupIonButton = styled(IonButton)`
  margin: 40px 24px 0px 24px;
  opacity: 1;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.03em;
  --border-radius: 21px;
  --background-activated: #4d7d75;
  --background: ${(props: { disabled: boolean }) =>
    props.disabled ? '#BED7D2' : '#73bfb1'};
`

const PasswordResetIonText = styled(IonText)`
  font-family: Roboto;
  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: center;
  margin: 32px auto 0px auto;
`

const GoogleIonImg = styled(IonImg)`
  width: 20px;
  height: 20px;
  margin-right: 18px;
`

const SignupIonInput = styled(IonInput)``
const EyeImage = styled.img`
  position: absolute;
  right: 12px;
  top: 40px;
  z-index: 2;
`

const InfoIonItem = styled(IonItem)`
  width: 100%;
  padding: 0 36px;
  margin-top: 20px;
  margin-bottom: 55%;
`

const InfoLink = styled.a`
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0.03em;
`
