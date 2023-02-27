import React, { useState, useRef, useEffect } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import VideoContentList from '../components/video/content/List'
import styled from 'styled-components'

const Home: React.FC = () => {
  const page = useRef(null)

  return (
    <HomeIonPage ref={page}>
      <IonContent>
        <VideoContentList></VideoContentList>
      </IonContent>
    </HomeIonPage>
  )
}

export default Home

const HomeIonPage = styled(IonPage)`
  padding-top: 44px;
`
