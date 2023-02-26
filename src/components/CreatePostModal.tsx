import { useRef, useState, createRef } from 'react'
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
} from '@ionic/react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { createPost } from 'slices/postSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import styled from 'styled-components'
import UserIcon from '../components/user/Icon'

function CreatePostModal(props: any) {
  // ------------------- init -------------------
  const dispatch = useDispatch<AppDispatch>()

  const { isOpen, closeModal } = props

  const [imageFile, setImage] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [publishStatus, setPublishStatus] = useState<string>('publish')
  const [showActionSheet, setShowActionSheet] = useState(false)

  const handleChange = async (e: any) => {
    setImage(e.target.files[0])
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
      url: imageUrl,
      type: 'video',
      status: publishStatus,
      title: title,
      description: description,
    }
    console.log(post)
    /*
    dispatch(createPost(post))
    */
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
    } else {
      return true
    }
  }

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
      <Wrapper>
        <HeadContents>
          <UserIconWrapper>
            <UserIcon></UserIcon>
          </UserIconWrapper>
          <PublishStatusArea>
            <PublishStatusButton onClick={() => setShowActionSheet(true)}>
              <PublishStatusButtonText>
                {publishStatus === 'publish' ? '公開' : '下書き'}
              </PublishStatusButtonText>
              <PublishStatusButtonArrow>▼</PublishStatusButtonArrow>
            </PublishStatusButton>
            <TagInputArea>
              <TagAddText>タグを追加...</TagAddText>
              <TagPlusButton>
                <span>+</span>
              </TagPlusButton>
            </TagInputArea>
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
                    <VideoThumbnailImg src="assets/icon/logo.svg" />
                    <VideoThumbnailText>動画を選択する</VideoThumbnailText>
                  </>
                )}
              </VideoThumbnailInner>
            )}
          </label>
        </div>
        {imageUrl && imageUrl !== '' ? (
          <TitleInputArea>
            <Title>タイトル</Title>
            <TitleInputIonItem>
              <IonInput
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
                clearInput
              ></IonInput>
            </TitleInputIonItem>
          </TitleInputArea>
        ) : (
          <></>
        )}
        <DescriptionInputIonItem>
          <IonInput
            value={description}
            placeholder="あなたの作品をアピールしよう！"
            onIonChange={(e) => setDescription(e.detail.value!)}
            clearInput
          ></IonInput>
        </DescriptionInputIonItem>
        {publishStatus === 'publish' ? (
          <form onSubmit={handleSubmit}>
            {isPublish() ? (
              <PublishButton>投稿する</PublishButton>
            ) : (
              <DisableButton>投稿する</DisableButton>
            )}
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
  height: 100vh;
`

const VideoThumbnailInner = styled.div`
  width: 100%;
  height: calc((100vw - 16px) * 9 / 16);
  border: #b7e7ca 2px solid;
  background: rgba(196, 196, 196, 0.6);
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`
const VideoThumbnailImg = styled.img`
  width: 122px;
`

const VideoThumbnailText = styled.span`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
`
// FIXME：縦長動画に対応しきれてない
const ThumbnailVideoImage = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: #b7e7ca 2px solid;
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
  background: #545454;
  border-radius: 12px;
  border: 1px solid #b7e7ca;
  padding: 2px 12px;
  max-width: 77px;
`

const PublishStatusButtonText = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
`

const PublishStatusButtonArrow = styled.div`
  font-size: 5px;
`
const TagPlusButton = styled.div`
  background: #87b599;
  border-radius: 50%;
  width: 17px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TagInputArea = styled.div`
  display: flex;
  align-items: center;
`

const TagAddText = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: #717171;
`
const PublishStatusArea = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
`
const PublishButton = styled.button`
  width: 100%;
  background: #fff;
  color: #87b599;
  height: 41px;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.03em;
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
  margin-right: 16px;
`
const TitleInputArea = styled.div`
  margin: 14px 0px;
`
const TitleInputIonItem = styled(IonItem)`
  border-bottom: 2px solid #87b599;
`
const DescriptionInputIonItem = styled(IonItem)`
  border-bottom: 2px solid #87b599;
  height: 100px;
  margin-bottom: 24px;
`
const Title = styled.span`
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  color: #b7e7ca;
`
