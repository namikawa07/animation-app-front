import React, { useState, useRef, useEffect } from 'react';
import { IonPage,  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, IonButtons, IonBackButton, IonSegment, IonSegmentButton} from '@ionic/react';
import './Home.css';

import Header from '../components/Header'
import VideoContentList from '../components/video/content/List';

const Home: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);
  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonPage ref={page}>
    <Header></Header>
     <VideoContentList></VideoContentList>
     <IonModal ref={modal} trigger="open-modal" presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>ログイン</IonTitle>
              <IonButtons slot="end">
                <IonButton color="dark" onClick={() => dismiss()}>閉じる</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonSegment value="signup">
              <IonSegmentButton value="signup">
                <IonLabel>新規登録</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="signin">
                <IonLabel>ログイン</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <IonList>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
                </IonAvatar>
                <IonLabel>
                  <h2>Connor Smith</h2>
                  <p>Sales Rep</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=a" />
                </IonAvatar>
                <IonLabel>
                  <h2>Daniel Smith</h2>
                  <p>Product Designer</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=d" />
                </IonAvatar>
                <IonLabel>
                  <h2>Greg Smith</h2>
                  <p>Director of Operations</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=e" />
                </IonAvatar>
                <IonLabel>
                  <h2>Zoey Smith</h2>
                  <p>CEO</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
    </IonPage>
  );
};

export default Home;
