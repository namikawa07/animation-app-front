import VideoPlayer from '../Player'
import styled from 'styled-components'
import UserIcon from '../../user/Icon'

const VideoContentList: React.FC<any> = (props: any) => {
  const { post } = props

  return (
    <>
      {post.title ? (
        <>
          <VideoPlayerWrapper>
            <VideoPlayer videoUrl={post.video.url} />
            {post.title ? <VideoTitle>{post.title}</VideoTitle> : <></>}
          </VideoPlayerWrapper>
          <HiddenArea>{post.title}</HiddenArea>
        </>
      ) : (
        <>
          <VideoPlayerWrapperNoTitle>
            <VideoPlayer videoUrl={post.video.url} />
            {post.title ? <VideoTitle>{post.title}</VideoTitle> : <></>}
          </VideoPlayerWrapperNoTitle>
          <HiddenArea>{post.title}</HiddenArea>
        </>
      )}
      <CreatorWrapper>
        <UserIconWrapper>
          <UserIcon></UserIcon>
        </UserIconWrapper>
        <CreatorInfoWrapper>
          {post.description ? (
            <>
              <CreatorLabelWrapper>{CreatorLabel(post)}</CreatorLabelWrapper>
              <PostDescription>{post.description}</PostDescription>
            </>
          ) : (
            <CreatorNameNoDescription>
              {CreatorLabel(post)}
            </CreatorNameNoDescription>
          )}
        </CreatorInfoWrapper>
      </CreatorWrapper>
    </>
  )
}

export const CreatorLabel = (post: any) => {
  return (
    <CreatorLabelInner>
      <CreatorName>{post.user.name}</CreatorName>
      <ActionItems>
        <ActionItem>
          <ActionItemImg src="assets/icon/hearts.svg" />
          <ActionItemCount>100</ActionItemCount>
        </ActionItem>
        <ActionItem>
          <ActionItemImg src="assets/icon/comments.svg" />
          <ActionItemCount>232</ActionItemCount>
        </ActionItem>
        <ActionItem>
          <ActionItemImg src="assets/icon/share.svg" />
          <ActionItemCount>10.2k</ActionItemCount>
        </ActionItem>
        <ActionItemImg src="assets/icon/option.svg" />
      </ActionItems>
    </CreatorLabelInner>
  )
}

export default VideoContentList

const VideoPlayerWrapper = styled.div`
  width: calc(100vw - 8px);
  height: calc((100vw - 8px) * 9 / 16);
  border: 2px solid #b7e7ca;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 2px;
`

const VideoPlayerWrapperNoTitle = styled.div`
  width: calc(100vw - 8px);
  height: calc((100vw - 8px) * 9 / 16);
  border: 2px solid #b7e7ca;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 8px;
`

const HiddenArea = styled.div`
  visibility: hidden;
`

const VideoTitle = styled.span`
  background: #2b2b2b;
  border: 2px solid #b7e7ca;
  padding: 6px 24px;
  border-radius: 6px;
  position: absolute;
  top: calc(((100vw - 8px) * 9 / 16) - 15px);
  left: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  max-width: calc(100vw - 32px);
`
const CreatorWrapper = styled.div`
  display: flex;
  padding: 0px 6px;
`

const CreatorLabelWrapper = styled.div`
  margin: auto 0;
`
const CreatorNameNoDescription = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const CreatorInfoWrapper = styled.div`
  flex: 1;
`

const PostDescription = styled.span`
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 8px;
  padding: 0px 12px;
`

const UserIconWrapper = styled.div`
  width: 34px;
  height: 34px;
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
  font-size: 12px;
  font-weight: 700;
  line-height: 13px;
`
const ActionItems = styled.div`
  width: 170px;
  display: flex;
  justify-content: space-around;
`

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3px;
`
const ActionItemImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 3px;
`
const ActionItemCount = styled.span`
  font-size: 8px;
`
