import {  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent } from '@ionic/react';


interface VideoContentListProps { }

const VideoContentList: React.FC<VideoContentListProps> = () => {
  return (
    <>
    <IonContent scrollEvents fullscreen>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Card Title</IonCardTitle>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more, nothing less.
        </IonCardContent>
      </IonCard>
      <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        Here's a small text description for the card content. Nothing more, nothing less.
      </IonCardContent>
    </IonCard>
      <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        Here's a small text description for the card content. Nothing more, nothing less.
      </IonCardContent>
    </IonCard>
    <IonCard>
    <IonCardHeader>
      <IonCardTitle>Card Title</IonCardTitle>
      <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent>
      Here's a small text description for the card content. Nothing more, nothing less.
    </IonCardContent>
  </IonCard>
    <IonCard>
    <IonCardHeader>
      <IonCardTitle>Card Title</IonCardTitle>
      <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent>
      Here's a small text description for the card content. Nothing more, nothing less.
    </IonCardContent>
  </IonCard>
  </IonContent>
  </>
  );
};

export default VideoContentList;
