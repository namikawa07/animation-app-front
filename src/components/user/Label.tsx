import { IonText } from '@ionic/react'
import styled from 'styled-components'
const UserLabel: React.FC = () => {
  const NameWrapper = styled.div`
    display: flex;
    flex-flow: column;
  `

  const IonMainText = styled(IonText)`
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  `

  const IonSubText = styled(IonText)`
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: gray;
  `
  return (
    <NameWrapper>
      <IonMainText>田中太郎</IonMainText>
      <IonSubText>@tanaka_tarou</IonSubText>
    </NameWrapper>
  )
}

export default UserLabel
