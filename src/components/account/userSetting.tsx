import React, { useState } from 'react'
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonTextarea,
  IonButton,
  IonText,
  IonAvatar,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  useIonPicker,
  IonThumbnail,
  IonImg,
} from '@ionic/react'

import styled from 'styled-components'

const UserSetting: React.FC = () => {
  const [name, setName] = useState<string | null>()
  const [birthday, setBirthday] = useState<string | null>()
  const [gender, setGender] = useState<string | null>('未設定')
  const [introduction, setIntroduction] = useState<string | null>()
  const [present] = useIonPicker()

  const openPicker = async () => {
    present({
      columns: [
        {
          name: 'languages',
          options: [
            {
              text: '未設定',
              value: 'none',
            },
            {
              text: '男性',
              value: 'male',
            },
            {
              text: '女性',
              value: 'female',
            },
            {
              text: 'その他',
              value: 'other',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '決定',
          handler: (value) => {
            setGender(value.languages.text)
          },
        },
      ],
    })
  }

  const AccountSettingWrapper = styled(IonContent)`
    height: 100vh;
    --padding-top: 44px;
  `

  const AccountSettingIconIonAvatar = styled(IonAvatar)`
    position: absolute;
    left: 12px;
    top: 231px;
    z-index: 10;
    width: 80px;
    height: 80px;
    border: 5px solid white;
  `

  const AccountSettingContentIonContent = styled(IonContent)`
    --padding-top: 55px;
    --padding-start: 24px;
    --padding-end: 24px;
    position: relative;
  `

  const AccountSettingInputWrapperIonList = styled(IonList)`
    margin-bottom: 30px;
  `

  return (
    <AccountSettingWrapper>
      <AccountSettingIconIonAvatar color="dark">
        <img
          alt="Silhouette of a person's head"
          src="https://ionicframework.com/docs/img/demos/avatar.svg"
        />
      </AccountSettingIconIonAvatar>

      <IonThumbnail>
        <IonImg
          src="https://docs-demo.ionic.io/assets/madison.jpg"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></IonImg>
      </IonThumbnail>

      <AccountSettingContentIonContent scrollY={false}>
        <AccountSettingInputWrapperIonList>
          <IonItem>
            <IonLabel position="stacked">名前</IonLabel>
            <IonInput value={name} onIonChange={(e) => setName(e.detail.value)}>
              {' '}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">生年月日</IonLabel>
            <IonDatetimeButton
              datetime="datetime"
              slot="end"
            ></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" onClick={openPicker}>
              性別
            </IonLabel>
            <IonText slot="end" onClick={openPicker}>
              {gender}
            </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">自己紹介</IonLabel>
            <IonTextarea
              value={introduction}
              onIonChange={(e) => setIntroduction(e.detail.value)}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Twitter</IonLabel>
            <IonInput value={name} onIonChange={(e) => setName(e.detail.value)}>
              {' '}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Instagram</IonLabel>
            <IonInput value={name} onIonChange={(e) => setName(e.detail.value)}>
              {' '}
            </IonInput>
          </IonItem>
        </AccountSettingInputWrapperIonList>
        <IonButton
          onClick={() => console.log(`******保存する`)}
          expand="block"
          color="dark"
          fill="outline"
        >
          <IonText color="orange">保存</IonText>
        </IonButton>
      </AccountSettingContentIonContent>
    </AccountSettingWrapper>
  )
}

export default UserSetting
