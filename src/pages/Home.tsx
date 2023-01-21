import React, { useState, useRef, useEffect } from 'react'
import { IonPage } from '@ionic/react'
import './Home.css'
import Header from '../components/Header'
import VideoContentList from '../components/video/content/List'
import SignupModal from '../components/SignupModal'

const Home: React.FC = () => {
  const page = useRef(null)

  return (
    <IonPage ref={page}>
      <Header></Header>
      <VideoContentList></VideoContentList>
      <SignupModal openPage={page}></SignupModal>
    </IonPage>
  )
}

export default Home
