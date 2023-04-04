import styled from 'styled-components'

const VideoPlayer: React.FC<any> = (props: any) => {
  const { videoUrl } = props

  // 再生中のvideoはstateで保持しておきたい
  // gifファイルとか対応するように
  // 縦長の動画でもファーストビューで対応したい
  return (
    <>
      <Video
        id="my-video"
        className="video-js"
        controls
        preload="auto"
        data-setup="{}"
      >
        <source src={videoUrl} type="video/mp4" />
      </Video>
    </>
  )
}

export default VideoPlayer

const Video = styled.video`
  width: 100%;
  height: 100%;
`
