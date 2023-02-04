import { useState, useRef } from 'react'
import {
  IonPage,
  IonImg,
  IonContent,
  IonThumbnail,
  IonAvatar,
  IonText,
  IonItem,
  IonSlides,
  IonSlide,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonButton,
  IonActionSheet,
} from '@ionic/react'
import {
  settingsOutline,
  personOutline,
  gridOutline,
  logOutOutline,
} from 'ionicons/icons'
import styled from 'styled-components'

const Account: React.FC = () => {
  const mySlides = useRef<HTMLIonSlidesElement>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [showActionSheet, setShowActionSheet] = useState(false)

  const slideOpts = {
    initialSlide: currentSlide,
    speed: 400,
  }

  const onSlideChange = async (ev: any) => {
    let index = 0
    await ev.target.getActiveIndex().then((value: number) => (index = value))
    setCurrentSlide(index)
  }

  const onSegmentChange = async (ev: any) => {
    const swiper = await mySlides.current?.getSwiper()
    let index = 0
    if (ev.detail.value === '0') index = 0
    if (ev.detail.value === '1') index = 1
    swiper.slideTo(index)
    setCurrentSlide(index)
  }

  const countList = [
    { count: '206', text: 'フォロー中' },
    { count: '20.0K', text: 'フォロワー' },
    { count: '21', text: 'いいね' },
    { count: '42.1K', text: '再生回数' },
  ]

  const postCardList = [
    {
      src: 'https://docs-demo.ionic.io/assets/madison.jpg',
      alt: 'The Wisconsin State Capitol building in Madison, WI at night',
    },
    {
      src: 'https://docs-demo.ionic.io/assets/madison.jpg',
      alt: 'The Wisconsin State Capitol building in Madison, WI at night',
    },
    {
      src: 'https://docs-demo.ionic.io/assets/madison.jpg',
      alt: 'The Wisconsin State Capitol building in Madison, WI at night',
    },
    {
      src: 'https://docs-demo.ionic.io/assets/madison.jpg',
      alt: 'The Wisconsin State Capitol building in Madison, WI at night',
    },
  ]

  const accountCardList = [{ icon: personOutline, text: 'アカウント設定' }]

  // -------------------------------styled -------------------------------

  const AccountWrapperIonContent = styled(IonContent)`
    height: 100vh;
    --padding-top: 44px;
  `

  const AccountImageIonThumbnail = styled(IonThumbnail)`
    height: calc(100vw * 1 / 2);
    width: 100vw;
    object-fit: cover;
  `

  const AccountContent = styled.div`
    position: relative;
  `

  const AccountItemIonItem = styled(IonItem)`
    position: absolute;
    left: 0px;
    top: -30px;
    --background: rgba(0, 0, 0, 0);
    --border-color: rgba(0, 0, 0, 0);
    width: 100%;
    --padding-start: 10px;
  `

  const AccountAvaterIonAvatar = styled(IonAvatar)`
    width: 80px;
    height: 80px;
    border: 5px solid white;
    margin: 12px 12px 12px 0px;
  `

  const AccountLabel = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: auto;
    margin-bottom: 20px;
  `

  const AccountNameIonText = styled(IonText)`
    font-size: 20px;
    font-weight: 800;
  `

  const AccountUidIonText = styled(IonText)`
    font-size: 14px;
    color: gray;
  `

  const AccountEditButtonIonItem = styled(IonItem)`
    margin-left: auto;
  `

  const AccountEditButtonTextIonText = styled(IonText)`
    border: 1px solid gray;
    padding: 4px 16px;
    border-radius: 30px;
    font-size: 14px;
  `

  const AccountDescriptionIonItem = styled(IonItem)`
    padding-top: 65px;
    --background: rgba(0, 0, 0, 0);
    --border-color: rgba(0, 0, 0, 0);
    width: 100%;
    --padding-start: 10px;
    font-size: 12px;
    line-height: 14px;
  `

  const AccountCountListIonItem = styled(IonItem)`
    --padding-start: 0px;
    --border-color: rgba(0, 0, 0, 0);
    margin-top: 10px;
  `

  const AccountCountListItemWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 25%;
  `

  const AccountCountListItem = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  `

  const AccountCountListItemCountIonText = styled(IonText)`
    font-weight: 700;
    margin-bottom: 2px;
  `
  const AccountCountListItemTextIonText = styled(IonText)`
    font-size: 10px;
    color: gray;
  `

  const AccountCountListItemBorder = styled.div`
    height: 60%;
    width: 1px;
    background: gray;
  `

  const AccountImageIonImg = styled(IonImg)`
    width: calc(100vw * 3 / 10);
    height: calc(100vw * 3 / 10);
    object-fit: cover;
  `

  const AccountSettingsWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  `

  const AccountSettingsItemAccountIonIcon = styled(IonIcon)`
    width: calc(100vw * 1 / 10);
    height: calc(100vw * 1 / 10);
    background-color: #eeeeee;
    padding: 14px;
    border-radius: 16px;
    margin-bottom: 2px;
  `

  const AccountSettingsItemAccountIonText = styled(IonText)`
    font-size: 12px;
  `

  const AccountChangeWrapperIonSegment = styled(IonSegment)`
    margin: 24px auto 6px auto;
    width: 80%;
  `

  const AccountChangeButtonIonSegmentButton = styled(IonSegmentButton)`
    padding: 2px 0px;
  `

  const AccountSlideIonSlide = styled(IonSlide)`
    flex-wrap: wrap;
    padding: 0 auto;
  `

  const AccountIonCard = styled(IonCard)`
    margin: 4px;
  `

  const AccountToggleActivePostIconIonIcon = styled(IonIcon)`
    ${currentSlide === 0
      ? `color: orange;
    width: 24px;
    height: 24px;`
      : `
      width: 24px;
      height: 24px;`}
  `

  const AccountToggleActiveAccountIconIonIcon = styled(IonIcon)`
    ${currentSlide === 1
      ? `color: orange;
    width: 24px;
    height: 24px;`
      : ` color: black;
      width: 24px;
      height: 24px;`}
  `

  // -------------------------------styled -------------------------------

  return (
    <IonPage>
      <AccountWrapperIonContent>
        <AccountImageIonThumbnail>
          <IonImg
            src="https://docs-demo.ionic.io/assets/madison.jpg"
            alt="The Wisconsin State Capitol building in Madison, WI at night"
          ></IonImg>
        </AccountImageIonThumbnail>
        <AccountContent>
          <AccountItemIonItem>
            <AccountAvaterIonAvatar color="dark">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </AccountAvaterIonAvatar>
            <AccountLabel>
              <AccountNameIonText>並川 樹</AccountNameIonText>
              <AccountUidIonText>@tatsuki_namikawa</AccountUidIonText>
            </AccountLabel>
            <AccountEditButtonIonItem
              button
              routerLink="/account/detail?type=accountSettings"
              detail={false}
              lines="none"
              fill="outline"
              type="button"
            >
              <AccountEditButtonTextIonText>編集</AccountEditButtonTextIonText>
            </AccountEditButtonIonItem>
          </AccountItemIonItem>
          <AccountDescriptionIonItem>
            UUUM株式会社（本社：東京都港区、代表取締役社長CEO：鎌田
            和樹、以下、UUUM）は、任天堂株式会社（以下、任天堂）の著作物の取り扱いに関して、従前より包括的許諾を受けておりますが、このたび、業務提携先である吉本興業株式会社（以下、吉本興業）に所属するタレントのYouTubeチャン
          </AccountDescriptionIonItem>
        </AccountContent>
        <AccountCountListIonItem>
          {countList.map((listItem, index) => {
            index++
            return (
              <>
                <AccountCountListItemWrapper>
                  <IonItem
                    routerLink="/account/detail?type=following"
                    lines="none"
                    detail={false}
                  >
                    <AccountCountListItem>
                      <AccountCountListItemCountIonText>
                        {listItem.count}
                      </AccountCountListItemCountIonText>
                      <AccountCountListItemTextIonText>
                        {listItem.text}
                      </AccountCountListItemTextIonText>
                    </AccountCountListItem>
                  </IonItem>
                </AccountCountListItemWrapper>
                {countList.length === index ? (
                  <></>
                ) : (
                  <AccountCountListItemBorder></AccountCountListItemBorder>
                )}
              </>
            )
          })}
        </AccountCountListIonItem>

        <AccountChangeWrapperIonSegment
          value={`${currentSlide}`}
          onIonChange={(e) => onSegmentChange(e)}
        >
          <AccountChangeButtonIonSegmentButton value="0">
            <AccountToggleActivePostIconIonIcon
              icon={gridOutline}
              className={currentSlide === 0 ? 'active' : 'negative'}
            ></AccountToggleActivePostIconIonIcon>
          </AccountChangeButtonIonSegmentButton>
          <AccountChangeButtonIonSegmentButton value="1">
            <AccountToggleActiveAccountIconIonIcon
              icon={settingsOutline}
              className={currentSlide === 1 ? 'active' : 'negative'}
            ></AccountToggleActiveAccountIconIonIcon>
          </AccountChangeButtonIonSegmentButton>
        </AccountChangeWrapperIonSegment>
        <IonSlides
          ref={mySlides}
          options={slideOpts}
          className="slider"
          onIonSlideDidChange={(e) => onSlideChange(e)}
        >
          <AccountSlideIonSlide>
            <IonGrid>
              <IonRow>
                {postCardList.map((postCardListItem) => {
                  return (
                    <>
                      <IonCol size="4" size-md>
                        <AccountIonCard>
                          <AccountImageIonImg
                            src={postCardListItem.src}
                            alt={postCardListItem.alt}
                          ></AccountImageIonImg>
                        </AccountIonCard>
                      </IonCol>
                    </>
                  )
                })}
              </IonRow>
            </IonGrid>
          </AccountSlideIonSlide>
          <AccountSlideIonSlide>
            <IonGrid>
              <IonRow>
                {accountCardList.map((accountCardListItem) => {
                  return (
                    <>
                      <IonCol size="4">
                        <IonItem
                          button
                          routerLink="/account/userSetting"
                          detail={false}
                          lines="none"
                          fill="outline"
                          type="button"
                        >
                          <AccountSettingsWrapper>
                            <AccountSettingsItemAccountIonIcon
                              icon={accountCardListItem.icon}
                            />
                            <AccountSettingsItemAccountIonText>
                              {accountCardListItem.text}
                            </AccountSettingsItemAccountIonText>
                          </AccountSettingsWrapper>
                        </IonItem>
                      </IonCol>
                    </>
                  )
                })}

                <IonCol size="12">
                  <IonButton
                    onClick={() => setShowActionSheet(true)}
                    expand="block"
                    color="medium"
                    fill="outline"
                  >
                    <IonText color="danger">ログアウト</IonText>
                    <IonIcon
                      icon={logOutOutline}
                      slot="start"
                      color="danger"
                    ></IonIcon>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </AccountSlideIonSlide>
        </IonSlides>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          header="ログアウトしますか"
          buttons={[
            {
              text: 'ログアウト',
              role: 'destructive',
              id: 'delete-button',
              data: {
                type: 'delete',
              },
              handler: () => {
                console.log('Delete clicked')
              },
            },
            {
              text: '閉じる',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ]}
        ></IonActionSheet>
      </AccountWrapperIonContent>
    </IonPage>
  )
}

export default Account
