import {
  IonPage,
  IonImg,
  IonContent,
  IonThumbnail,
  IonAvatar,
  IonText,
  IonItem,
  IonLabel,
} from '@ionic/react'
import './Account.css'

const Account: React.FC = () => {
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
      </IonContent>
    </IonPage>
  )
}

export default Account
