import VideoPlayer from '../Player'
import styled from 'styled-components'
import UserIcon from '../../user/Icon'
import { useSelector } from 'react-redux'
import VideoContentsActions from '../content/Actions'

const VideoContentList: React.FC<any> = (props: any) => {
  const { post } = props
  const profileState = useSelector((state: any) => {
    return state.profileState
  })

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
    <>
      <VideoPlayerWrapper>
        <VideoPlayer videoUrl={post.video.url} />
      </VideoPlayerWrapper>
      <CreatorWrapper>
        <UserIconWrapper>
          <UserIcon srcUrl={AccountImgSrc()}></UserIcon>
        </UserIconWrapper>
        <CreatorInfoWrapper>
          <CreatorLabelWrapper>{CreatorLabel(post.title)}</CreatorLabelWrapper>
          <PostDescription>{post.user.name}</PostDescription>
        </CreatorInfoWrapper>
      </CreatorWrapper>
      <VideoContentsActions />
    </>
  )
}

export const CreatorLabel = (postTitle: string) => {
  return (
    <CreatorLabelInner>
      <CreatorName>{postTitle}</CreatorName>
    </CreatorLabelInner>
  )
}

export default VideoContentList

const VideoPlayerWrapper = styled.div`
  width: 100vw;
  height: calc(100vw * 9 / 16);
  margin: 0 auto;
  position: relative;
`

const CreatorWrapper = styled.div`
  display: flex;
  padding: 0px 10px;
  margin-top: 8px;
  text-align: left;
`

const CreatorLabelWrapper = styled.div`
  margin: auto 0;
  margin-top: 3px;
`

const CreatorInfoWrapper = styled.div`
  flex: 1;
  color: var(--moon-black);
`

const PostDescription = styled.span`
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 5px;
  padding: 0px 12px;
`

const UserIconWrapper = styled.div`
  width: 36px;
  height: 36px;
`
const CreatorLabelInner = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  width: 100%;
`

const CreatorName = styled.span`
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
`
