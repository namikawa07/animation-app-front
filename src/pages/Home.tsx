import React, { useState, useRef, useEffect } from 'react'
import { IonPage } from '@ionic/react'
import './Home.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import VideoContentList from '../components/video/content/List'
import SignupModal from '../components/SignupModal'

const Home: React.FC = () => {
  const page = useRef(null)

  return (
    <IonPage ref={page}>
      <VideoContentList></VideoContentList>
    </IonPage>
  )
}

export default Home
