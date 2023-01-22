import { useState, useRef } from 'react'
import {
  IonPage,
  IonImg,
  IonContent,
  IonThumbnail,
  IonAvatar,
  IonText,
  IonItem,
  IonSlides,
  IonSlide,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonButton,
  IonActionSheet,
} from '@ionic/react'
import {
  settingsOutline,
  personOutline,
  gridOutline,
  logOutOutline,
} from 'ionicons/icons'
import './Account.css'

const Account: React.FC = () => {
  const mySlides = useRef<HTMLIonSlidesElement>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [showActionSheet, setShowActionSheet] = useState(false)

  const slideOpts = {
    initialSlide: currentSlide,
    speed: 400,
  }

  const onSlideChange = async (ev: any) => {
    let index = 0
    await ev.target.getActiveIndex().then((value: number) => (index = value))
    setCurrentSlide(index)
  }

  const onSegmentChange = async (ev: any) => {
    const swiper = await mySlides.current?.getSwiper()
    let index = 0
    if (ev.detail.value === '0') index = 0
    if (ev.detail.value === '1') index = 1
    swiper.slideTo(index)
    setCurrentSlide(index)
  }

  return (
    <IonPage>
      <IonContent className="account">
        <IonThumbnail className="account__img">
          <IonImg
            src="https://docs-demo.ionic.io/assets/madison.jpg"
            alt="The Wisconsin State Capitol building in Madison, WI at night"
          ></IonImg>
        </IonThumbnail>
        <div className="account__content">
          <IonItem className="account__item">
            <IonAvatar className="account__avatar" color="dark">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <div className="account__info">
              <IonText className="account__name">並川 樹</IonText>
              <IonText className="account__uid">@tatsuki_namikawa</IonText>
            </div>
            <IonItem
              className="account__edit"
              button
              routerLink="/account/userSetting"
              detail={false}
              lines="none"
              fill="outline"
              type="button"
            >
              <IonText className="account__edit__text">編集</IonText>
            </IonItem>
          </IonItem>
          <IonItem className="account__description">
            UUUM株式会社（本社：東京都港区、代表取締役社長CEO：鎌田
            和樹、以下、UUUM）は、任天堂株式会社（以下、任天堂）の著作物の取り扱いに関して、従前より包括的許諾を受けておりますが、このたび、業務提携先である吉本興業株式会社（以下、吉本興業）に所属するタレントのYouTubeチャン
          </IonItem>
        </div>
        <IonItem className="account__counts">
          <div className="account__counts__item">
            <div className="account__counts__item__count">206</div>
            <div className="account__counts__item__sub">フォロー中</div>
          </div>
          <div className="account__counts__border"></div>
          <div className="account__counts__item">
            <div className="account__counts__item__count">20.0K</div>
            <div className="account__counts__item__sub">フォロワー</div>
          </div>
          <div className="account__counts__border"></div>
          <div className="account__counts__item">
            <div className="account__counts__item__count">21</div>
            <div className="account__counts__item__sub">いいね</div>
          </div>
          <div className="account__counts__border"></div>
          <div className="account__counts__item">
            <div className="account__counts__item__count">43.1K</div>
            <div className="account__counts__item__sub">再生回数</div>
          </div>
        </IonItem>

        <IonSegment
          className="account__content__segment"
          value={`${currentSlide}`}
          onIonChange={(e) => onSegmentChange(e)}
        >
          <IonSegmentButton
            value="0"
            className="account__content__segment__button"
          >
            <IonIcon
              icon={gridOutline}
              className={currentSlide === 0 ? 'active' : 'negative'}
            ></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton
            value="1"
            className="account__content__segment__button"
          >
            <IonIcon
              icon={settingsOutline}
              className={currentSlide === 1 ? 'active' : 'negative'}
            ></IonIcon>
          </IonSegmentButton>
        </IonSegment>
        <IonSlides
          ref={mySlides}
          options={slideOpts}
          className="slider"
          onIonSlideDidChange={(e) => onSlideChange(e)}
        >
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol size="4" size-md>
                  <IonCard className="posts">
                    <IonImg
                      className="posts__img"
                      src="https://docs-demo.ionic.io/assets/madison.jpg"
                      alt="The Wisconsin State Capitol building in Madison, WI at night"
                    ></IonImg>
                  </IonCard>
                </IonCol>
                <IonCol size="4" size-md>
                  <IonCard className="posts">
                    <IonImg
                      className="posts__img"
                      src="https://docs-demo.ionic.io/assets/madison.jpg"
                      alt="The Wisconsin State Capitol building in Madison, WI at night"
                    ></IonImg>
                  </IonCard>
                </IonCol>
                <IonCol size="4" size-md>
                  <IonCard className="posts">
                    <IonImg
                      className="posts__img"
                      src="https://docs-demo.ionic.io/assets/madison.jpg"
                      alt="The Wisconsin State Capitol building in Madison, WI at night"
                    ></IonImg>
                  </IonCard>
                </IonCol>
                <IonCol size="4" size-md>
                  <IonCard className="posts">
                    <IonImg
                      className="posts__img"
                      src="https://docs-demo.ionic.io/assets/madison.jpg"
                      alt="The Wisconsin State Capitol building in Madison, WI at night"
                    ></IonImg>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonItem
                    button
                    routerLink="/account/userSetting"
                    detail={false}
                    lines="none"
                    fill="outline"
                    type="button"
                    className="settings_item"
                  >
                    <div className="settings__item__content">
                      <IonIcon
                        className="settings__item__content__account"
                        icon={personOutline}
                      />
                      <IonText className="settings__item__content__account__text">
                        アカウント設定
                      </IonText>
                    </div>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonButton
                    onClick={() => setShowActionSheet(true)}
                    expand="block"
                    color="medium"
                    fill="outline"
                  >
                    <IonText color="danger">ログアウト</IonText>
                    <IonIcon
                      icon={logOutOutline}
                      slot="start"
                      color="danger"
                    ></IonIcon>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          header="ログアウトしますか"
          buttons={[
            {
              text: 'ログアウト',
              role: 'destructive',
              id: 'delete-button',
              data: {
                type: 'delete',
              },
              handler: () => {
                console.log('Delete clicked')
              },
            },
            {
              text: '閉じる',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  )
}

export default Account
