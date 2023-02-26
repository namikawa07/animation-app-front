import { useState, useEffect } from 'react'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonContent,
} from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { fetchAllPosts } from '../../../../src/slices/postsSlice'
import VideoPlayer from '../Player'
import VideoContentListItem from '../content/ListItem'
import styled from 'styled-components'

const VideoContentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const postsState: any = useSelector((state: any) => {
    return state.postsState
  })

  useEffect(() => {
    dispatch(fetchAllPosts())
    console.log(postsState)
  }, [])

  return (
    <>
      {postsState.posts && postsState.posts.length > 0 ? (
        postsState.posts.map((post: any) => {
          return (
            <VideoContentListItemWrapper key={post.id}>
              <VideoContentListItem post={post}></VideoContentListItem>
            </VideoContentListItemWrapper>
          )
        })
      ) : (
        <></>
      )}
    </>
  )
}

export default VideoContentList

const VideoContentListItemWrapper = styled.div`
  margin-bottom: 20px;
`
