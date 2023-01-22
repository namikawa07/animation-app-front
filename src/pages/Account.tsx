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
  IonLabel,
  IonIcon,
} from '@ionic/react'
import { settingsOutline, filmOutline, personOutline } from 'ionicons/icons'
import './Account.css'

const Account: React.FC = () => {
  const mySlides = useRef<HTMLIonSlidesElement>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

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

  const ionClass = 'active'

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
              icon={filmOutline}
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
                <IonCol size="4" size-md>
                  <IonItem routerLink="/account/userSetting">
                    <IonCard className="settings__item">
                      <IonIcon icon={personOutline}></IonIcon>
                    </IonCard>
                  </IonItem>
                  <IonLabel>アカウント設定</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Account
