import React, { useState, useRef, useEffect } from 'react'
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSlides,
  IonSlide,
} from '@ionic/react'
import VideoContentList from '../components/video/content/List'
import styled from 'styled-components'

const Home: React.FC = () => {
  const page = useRef(null)
  const mySlides = useRef<HTMLIonSlidesElement>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [currentTab, setCurrentTab] = useState<string>('recommend')
  const slideOpts = {
    initialSlide: currentSlide,
    speed: 400,
    scrollbar: true,
    slidesPerView: 1,
  }

  const onSlideChange = async (ev: any) => {
    let index = 0
    await ev.target.getActiveIndex().then((value: number) => (index = value))

    setCurrentSlide(index)
    let target = 'recommend'
    if (index === 1) {
      target = 'follower'
    }
    setCurrentTab(target)
  }

  const onTabChange = async (target: string) => {
    setCurrentTab(target)
    const swiper = await mySlides.current?.getSwiper()
    let index = 0
    if (target === 'recommend') {
      index = 0
    } else if (target === 'follower') {
      index = 1
    }
    swiper?.slideTo(index)
    setCurrentSlide(index)
    setCurrentTab(target)
  }

  return (
    <HomeIonPage ref={page}>
      <HomeIonSegment
        value={currentTab}
        onIonChange={(e) => onTabChange(e.detail.value!)}
      >
        <HomeIonSegmentButton
          value={'recommend'}
        >
          <SegmentTitle isActive={currentTab === 'recommend' ? true : false}>おすすめ</SegmentTitle>
        </HomeIonSegmentButton>

        <HomeIonSegmentButton
          value={'follower'}
        >
          <SegmentTitle isActive={currentTab === 'follower' ? true : false}>フォロワー</SegmentTitle>
        </HomeIonSegmentButton>
      </HomeIonSegment>
      <HomeIonSlides
        ref={mySlides}
        options={slideOpts}
        onIonSlideDidChange={(e) => onSlideChange(e)}
      >
        <HomeIonSlide>
          <IonContent>
            <VideoContentList></VideoContentList>
          </IonContent>
        </HomeIonSlide>
        <HomeIonSlide>
          <IonContent>
            <VideoContentList></VideoContentList>
          </IonContent>
        </HomeIonSlide>
      </HomeIonSlides>
    </HomeIonPage>
  )
}

export default Home

const HomeIonPage = styled(IonPage)`
  padding-top: 44px;
`
const HomeIonSlides = styled(IonSlides)`
  height: 100vh;
  width: 100vw;
`

const HomeIonSlide = styled(IonSlide)`
  height: 100vh;
  width: 100vw;
`
const HomeIonSegment = styled(IonSegment)`
  height: 50px;
  border-radius: 0px;
`

const HomeIonSegmentButton = styled(IonSegmentButton)`
  background: var(--moon-white);
  --indicator-box-shadow: none;
  --border-radius: 0px;
  box-sizing:content-box;
  margin-top: 0px;
  margin-bottom: 0px;
`
const SegmentTitle = styled.span`
  width: 100px;
  height: 28px;
  ${(props: { isActive: boolean }) =>
  props.isActive
    ? 'color: var(--moon-main); border-bottom: 3px solid var(--moon-main);'
    : 'color: var(--moon-gray);'};
`
