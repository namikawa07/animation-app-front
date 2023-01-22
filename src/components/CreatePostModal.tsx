import React, { useState } from 'react'
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
} from '@ionic/react'

function CreatePostModal(props: any) {
  const { isOpen, closeModal } = props

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>投稿</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => closeModal()}>閉じる</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
          quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos,
          dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
          dicta.
        </p>
      </IonContent>
    </IonModal>
  )
}

export default CreatePostModal
