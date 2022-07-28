import React from 'react'

import { NextPage } from 'next';

import PageContainer from '../components/utilities/PageContainer';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage : NextPage = () => {
  return (
    <PageContainer>
        <Leaderboard />
    </PageContainer>
  )
}

export default LeaderboardPage;