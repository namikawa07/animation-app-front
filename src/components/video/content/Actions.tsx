import styled from 'styled-components'
import { IonImg } from '@ionic/react'

const VideoContentsActions: React.FC = () => {
  const actionsList = [
    { id: 1,icon: 'heart', text: 'いいね' },
    { id: 2,icon: 'comment', text: 'コメント' },
    { id: 3,icon: 'share-black', text: '共有' },
    { id: 4,icon: 'bookmark', text: 'お気に入り' },
  ]

  return (
    <ActionButtons>
      {actionsList.map((actionListItem) => {
        return (
          <>
            <ActionButton key={actionListItem.id}>
              <ActionImg
                src={`assets/icon/${actionListItem.icon}.svg`}
              ></ActionImg>
              <Separtor></Separtor>
              <ActionName>{actionListItem.text}</ActionName>
            </ActionButton>
          </>
        )
      })}
    </ActionButtons>
  )
}

export default VideoContentsActions

const ActionButtons = styled.div`
  display: flex;
  color: var(--moon-black);
  justify-content: space-around;
  margin-top: 8px;
  padding: 0px 6px;
`

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--moon-main);
  border-radius: 14px;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  padding: 0px 2px;
`

const ActionImg = styled(IonImg)`
  width: 18px;
  height: 18px;
  margin: 0px 5px;
`
const Separtor = styled.div`
  width: 1.5px;
  height: 100%;
  background: var(--moon-main);
`
const ActionName = styled.span`
  margin: 0px 5px;
`
