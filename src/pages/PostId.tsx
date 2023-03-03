import React, { useState, useRef, useEffect } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { useParams } from 'react-router-dom'
import { fetch } from '../../src/slices/postSlice'
import VideoPlayer from '../components/post/Player'
import { UseParamsType } from '../../src/types'
import ActionsLabel from '../components/ActionsLabel'

import styled from 'styled-components'

const PostId: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params: UseParamsType = useParams()

  const postState = useSelector((state: any) => {
    return state.postState
  })

  useEffect(() => {
    dispatch(fetch(params.uuid))
  }, [])
  return (
    <PostIonPage>
      <IonContent>
        {postState.loading === true && postState.post.video.url ? (
          <>
            <div>
              <VideoPlayer videoUrl={postState.post.video.url}></VideoPlayer>
            </div>
            <div>{postState.post.title}</div>
            <ActionsLabel></ActionsLabel>
            <div>{postState.post.description}</div>
          </>
        ) : (
          <></>
        )}
      </IonContent>
    </PostIonPage>
  )
}

export default PostId

const PostIonPage = styled(IonPage)`
  padding-top: 44px;
`
