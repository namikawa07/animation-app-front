import React, { useState, useRef, useEffect } from 'react'
import { IonPage } from '@ionic/react'
import './Home.css'
import VideoContentList from '../components/video/content/List'

const Home: React.FC = () => {
  const page = useRef(null)

  return (
    <IonPage ref={page}>
      <VideoContentList></VideoContentList>
    </IonPage>
  )
}

export default Home
