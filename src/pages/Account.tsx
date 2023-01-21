import {
  IonPage,
  IonImg,
  IonContent,
  IonThumbnail,
  IonAvatar,
} from '@ionic/react'
import './Account.css'
import styled from 'styled-components'

const Account: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="account">
        <IonThumbnail className="accountImg">
          <IonImg
            src="https://docs-demo.ionic.io/assets/madison.jpg"
            alt="The Wisconsin State Capitol building in Madison, WI at night"
          ></IonImg>

          <IonAvatar color="dark">
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
        </IonThumbnail>
      </IonContent>
    </IonPage>
  )
}

export default Account
