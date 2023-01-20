import React, { useState, useRef, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, IonButtons, IonBackButton,
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg, IonPage} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useLocation } from "react-router-dom"

import {locationType} from '../../src/types/global'

interface HeaderProps { }



const Header: React.FC<HeaderProps> = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);
  function dismiss() {
    modal.current?.dismiss();
  }

let BackButton  = <></>
const location = useLocation<locationType>()
if (location.pathname === '/account') {
  BackButton = <IonButtons slot="start">
  <IonBackButton text="戻る" defaultHref="/home"></IonBackButton>
  </IonButtons>
}

  return (
  <>

    <IonHeader translucent>
      <IonToolbar>
        {BackButton}
        <IonButtons slot="end">
          <IonButton color="medium" id="open-modal">
            <IonIcon slot="icon-only" ios={personCircle} md={personCircle}/>
          </IonButton>
        </IonButtons>
        <IonTitle>ANIMET</IonTitle>
      </IonToolbar>
    </IonHeader>
  </>
  );
};

export default Header;

