import React from 'react'

import { NextPage } from 'next'
import PageContainer from '../components/utilities/PageContainer'
import Account from '../components/Account'

const AccountPage : NextPage = () => {
  return (
    <PageContainer>
        <Account />
    </PageContainer>
  )
}

export default AccountPage