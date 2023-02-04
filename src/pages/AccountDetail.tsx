import React, { useState, useEffect } from 'react'
import { IonPage } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { locationType } from '../../src/types/global'

import UserSetting from '../components/account/userSetting'
import UserList from '../components/user/List'

const AccountDetail: React.FC = () => {
  const [currentSearch, setCurrentSearch] = useState<string>('/account/detail')

  const location = useLocation<locationType>()

  useEffect(() => {
    setCurrentSearch(location.search)
  }, [location])

  const getComponent = () => {
    let component = <></>
    if (currentSearch === '?type=accountSettings')
      component = (
        <IonPage>
          <UserSetting />
        </IonPage>
      )
    if (currentSearch === '?type=following')
      component = (
        <IonPage>
          <UserList />
        </IonPage>
      )

    return component
  }

  return <>{getComponent()}</>
}

export default AccountDetail
