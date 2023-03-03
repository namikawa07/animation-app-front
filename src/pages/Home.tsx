import React, { useState, useRef, useEffect } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import PostContentList from '../components/post/content/List'
import styled from 'styled-components'

const Home: React.FC = () => {
  const page = useRef(null)

  return (
    <HomeIonPage ref={page}>
      <IonContent>
        <PostContentList></PostContentList>
      </IonContent>
    </HomeIonPage>
  )
}

export default Home

const HomeIonPage = styled(IonPage)`
  padding-top: 44px;
`
