import AskBar from '@/components/chat/AskBar'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import KeyConcepts from '@/components/review/KeyConcepts'
import RapidFire from '@/components/review/RapidFire'
import React from 'react'

const ReviewPage = () => {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <TopBar />
        <RapidFire />
        <KeyConcepts />
        <AskBar />
      </main>
    </div>
  )
};

export default ReviewPage;
