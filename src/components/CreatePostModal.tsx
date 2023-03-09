import { useState, useEffect } from 'react'
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonActionSheet,
  IonLabel,
  IonTextarea,
} from '@ionic/react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { createPost } from 'slices/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import styled from 'styled-components'
import UserIcon from '../components/user/Icon'
import '../theme/variables.css'
import twitter from 'twitter-text'

function CreatePostModal(props: any) {
  // ------------------- init -------------------
  const dispatch = useDispatch<AppDispatch>()
  const profileState = useSelector((state: any) => {
    return state.profileState
  })

  const { isOpen, closeModal } = props

  const [imageUrl, setImageUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [descriptionCount, setDescriptionCount] = useState<number>(0)
  const [isOverdescriptionCount, setIsOverDescriptionCount] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [publishStatus, setPublishStatus] = useState<string>('publish')
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false)
  const [hashTags, setHashTags] = useState([])

  const postState: any = useSelector((state: any) => {
    return state.postState
  })

  const maxDescriptionCount = 140

  useEffect(() => {
    if (postState.loading === true && postState.error.status === false)
      resetInput()
  }, [postState])

  useEffect(() => {
    const descriptionLength: number =
      twitter.parseTweet(description).weightedLength / 2
    console.log(twitter.parseTweet(description).weightedLength)
    if (Number.isInteger(descriptionLength))
      setDescriptionCount(descriptionLength || 0)
    descriptionLength > maxDescriptionCount
      ? setIsOverDescriptionCount(true)
      : setIsOverDescriptionCount(false)
    checkHashTagsInDescription(description)
  }, [description])

  const checkHashTagsInDescription = (description: string) => {
    const autoLink = twitter.autoLink(description)

    const dom = document.createElement('div')
    dom.innerHTML = autoLink
    const aTags = dom.getElementsByTagName('a')
    const hashTagArray: any = []
    Array.prototype.forEach.call(aTags, function (aTag) {
      if (aTag.title) hashTagArray.unshift(aTag.title)
    })

    setHashTags(hashTagArray)
  }

  const handleChange = async (e: any) => {
    try {
      // 圧縮したらsizeは使わない方がいい
      const img = e.target.files[0]
      const uid = img.size + img.name
      const downloadType = 'videos'

      const imageRef = ref(storage, `${downloadType}/${uid}`)
      setLoading(true)
      uploadBytes(imageRef, img).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setImageUrl(url)
          setLoading(false)
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!isPublish()) return

    const post = {
      contents_type: 'video',
      url: imageUrl,
      title: title,
      description: description,
      status: publishStatus,
      hash_tags: hashTags
    }

    dispatch(createPost(post))
  }

  const isPublish = () => {
    if (
      (!title || title === '') &&
      (!description || description === '') &&
      (!imageUrl || imageUrl === '')
    ) {
      return false
    } else if (title && (!imageUrl || imageUrl === '')) {
      return false
    } else if (description.length > 160) {
      return false
    } else {
      return true
    }
  }

  const resetInput = () => {
    setTitle('')
    setDescription('')
    setImageUrl('')
    closeModal()
  }

  const AccountImgSrc = () => {
    if (profileState.profile && profileState.profile.thumbnail_url) {
      if (profileState.profile.thumbnail_url === 'default-thumbnail-url') {
        return `assets/icon/default-thumbnail.png`
      } else {
        return profileState.profile.thumbnail_url
      }
    } else {
      return 'assets/icon/account.svg'
    }
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => closeModal()}>
              <img src="assets/icon/close.svg"></img>
            </IonButton>
          </IonButtons>
          <IonTitle color="light">投稿</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Wrapper>
        <HeadContents>
          <UserIconWrapper>
            <UserIcon srcUrl={AccountImgSrc()}></UserIcon>
          </UserIconWrapper>
          <PublishStatusArea>
            <PublishStatusButton onClick={() => setShowActionSheet(true)}>
              <PublishStatusButtonText>
                {publishStatus === 'publish' ? '公開' : '下書き'}
              </PublishStatusButtonText>
              <PublishStatusButtonArrow>
                <img src="assets/icon/triangle.svg"></img>
              </PublishStatusButtonArrow>
            </PublishStatusButton>
            <TagWrapperIonItem>
              {hashTags.map((hashTag, index) => {
                return <TagIonItem key={index}>{hashTag}</TagIonItem>
              })}
            </TagWrapperIonItem>
          </PublishStatusArea>
        </HeadContents>
        <div>
          <label>
            <input type="file" hidden onChange={handleChange} />
            {imageUrl && imageUrl !== '' ? (
              <ThumbnailVideoImageWrapper>
                <ThumbnailVideoImage src={imageUrl}></ThumbnailVideoImage>
                <VideoPlayImg src="assets/icon/video/play.svg" />
              </ThumbnailVideoImageWrapper>
            ) : (
              <VideoThumbnailInner>
                {loading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress color="inherit" />
                  </Box>
                ) : (
                  <>
                    <VideoThumbnailImg src="assets/icon/upload.svg" />
                    <VideoThumbnailText>動画を選択する</VideoThumbnailText>
                  </>
                )}
              </VideoThumbnailInner>
            )}
          </label>
        </div>

        {imageUrl && imageUrl !== '' ? (
          <TitleInputIonItem>
            <TitleIonLabel position="floating">動画タイトル</TitleIonLabel>
            <TitleIonInput
              type="text"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
              clearInput
            ></TitleIonInput>
          </TitleInputIonItem>
        ) : (
          <></>
        )}

        <DescriptionInputIonItem>
          <DescriptionIonTextarea
            value={description}
            placeholder="あなたの作品をアピールしよう！"
            onIonChange={(e) => setDescription(e.detail.value!)}
            rows={6}
            autoGrow={true}
          ></DescriptionIonTextarea>
        </DescriptionInputIonItem>
        <DescriptionCountIonItem>
          <DescriptionCountIonLabel
            slot="end"
            isOverdescriptionCount={isOverdescriptionCount}
          >
            {descriptionCount}/{maxDescriptionCount}
          </DescriptionCountIonLabel>
        </DescriptionCountIonItem>
        {publishStatus === 'publish' ? (
          <form aria-disabled={!isPublish()} onSubmit={handleSubmit}>
            <PublishButton isPublish={isPublish()}>投稿する</PublishButton>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {isPublish() ? (
              <DraftButton>下書き保存</DraftButton>
            ) : (
              <DisableButton>下書き保存</DisableButton>
            )}
          </form>
        )}
      </Wrapper>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass="my-custom-class"
        buttons={[
          {
            text: '公開',
            role: publishStatus === 'publish' ? 'selected' : '',
            handler: () => {
              setPublishStatus('publish')
            },
          },
          {
            text: '下書き',
            role: publishStatus === 'draft' ? 'selected' : '',
            handler: () => {
              setPublishStatus('draft')
            },
          },
        ]}
      ></IonActionSheet>
    </IonModal>
  )
}

export default CreatePostModal

const Wrapper = styled.div`
  padding: 0px 16px;
`

const VideoThumbnailInner = styled.div`
  width: 100%;
  height: calc((100vw - 16px) * 9 / 16);
  border: 2px solid var(--moon-main);
  background: rgba(196, 196, 196, 0.6);
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`
const VideoThumbnailImg = styled.img`
  width: 81px;
  height: 81px;
`

const VideoThumbnailText = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  background: var(--moon-sub);
  border: 1px solid var(--moon-main);
  padding: 10px;
  border-radius: 22px;
  width: 165px;
  margin-top: 12px;
`
// FIXME：縦長動画に対応しきれてない
const ThumbnailVideoImage = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 2px solid var(--moon-main);
`

const ThumbnailVideoImageWrapper = styled.div`
  position: relative;
`
const VideoPlayImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`

const HeadContents = styled.div`
  display: flex;
  margin: 14px 0px;
`
const PublishStatusButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--moon-gray-white2);
  border-radius: 12px;
  border: 1px solid #b7e7ca;
  padding: 2px 12px;
  max-width: 77px;
`

const PublishStatusButtonText = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: #000;
`

const PublishStatusButtonArrow = styled.div`
  width: 8px;
  height: 8px;
  display: flex;
  margin-left: 4px;
`
const PublishStatusArea = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
`
const PublishButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 23px;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.03em;
  background: ${(props: { isPublish: boolean }) =>
    props.isPublish ? 'var(--moon-sub)' : 'var(--moon-gray-white)'};
  border: 2px solid
    ${(props: { isPublish: boolean }) =>
      props.isPublish ? 'var(--moon-main)' : 'none'};
  color: var(--moon-white);
`

const DisableButton = styled.button`
  width: 100%;
  background: #434343;
  color: #939393;
  height: 41px;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.03em;
`

const DraftButton = styled.button`
  width: 100%;
  background: #434343;
  color: #fff;
  height: 41px;
  border-radius: 16px;
  border: 2px solid #fff;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.03em;
`
const UserIconWrapper = styled.div`
  margin-right: 8px;
  width: 34px;
  height: 34px;
`
const TitleInputIonItem = styled(IonItem)`
  --padding-start: 0px;
  --inner-padding-end: 0px;
  --border-color: var(--moon-main);
  --inner-border-width: 0px 0px 1.5px 0px;
  margin-bottom: 24px;
`
const TitleIonInput = styled(IonInput)`
  --ion-item-border-color: var(--moon-main) !important;
`

const DescriptionInputIonItem = styled(IonItem)`
  --padding-start: 0px;
  --inner-padding-end: 0px;
  color: var(--moon-black);
  --border-color: var(--moon-main);
`

const DescriptionIonTextarea = styled(IonTextarea)`
  --ion-item-border-color: var(--moon-main) !important;

  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
`

const TitleIonLabel = styled(IonLabel)`
  color: var(--moon-main) !important;
  font-size: 16px;
  font-weight: 800;
  line-height: 19px;
`

const DescriptionCountIonItem = styled(IonItem)`
  color: var(--moon-black);
`
const DescriptionCountIonLabel = styled(IonLabel)`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${(props: { isOverdescriptionCount: boolean }) =>
    props.isOverdescriptionCount
      ? 'var(--moon-red)'
      : 'var(--moon-black)'} !important;
`
const TagWrapperIonItem = styled.div`
  --min-height: 19px;
  margin-top: 4px;
  display: -webkit-box;
  overflow-x: scroll;
  width: calc(100vw - 26px - 34px - 8px);
`

const TagIonItem = styled(IonItem)`
  --min-height: 19px;
  background: var(--moon-sub);
  color: var(--moon-white);
  --inner-padding-end: 0px;
  --padding-start: 0px;
  border: 1px solid var(--moon-main);
  border-radius: 12px;
  padding: 0px 12px;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  margin-right: 6px;
`
