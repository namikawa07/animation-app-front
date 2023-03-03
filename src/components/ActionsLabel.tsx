import styled from 'styled-components'

const ActionsLabel: React.FC<any> = () => {
  return (
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
     
    </ActionItems>
  )
}

export default ActionsLabel

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
