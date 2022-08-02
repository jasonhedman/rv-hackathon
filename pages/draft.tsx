import { NextPage } from 'next'
import React from 'react'
import Draft from '../components/Draft'
import PageContainer from '../components/utilities/PageContainer'

const DraftPage : NextPage = () => {
  return (
    <PageContainer>
        <Draft />
    </PageContainer>
  )
}

export default DraftPage