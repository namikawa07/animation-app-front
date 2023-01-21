import { IonImg, IonContent, IonThumbnail } from '@ionic/react'
import './Account.css'
import styled from 'styled-components'

const Account: React.FC = () => {
  return (
    <IonContent className="account">
      <IonThumbnail className="accountImg">
        <IonImg
          src="https://docs-demo.ionic.io/assets/madison.jpg"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></IonImg>
      </IonThumbnail>
    </IonContent>
  )
}

export default Account
