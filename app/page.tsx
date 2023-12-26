"use client"
import GameCategories from '../components/GameCategories'
import RecommendeGames from '../components/RecommendeGames'
import dynamic from 'next/dynamic';

const ModalCountDown = dynamic(() => import('../components/ModalCountDown'), { ssr: false });

export default function Home() {
  return (
    <main className="mx-2 relative">
      <RecommendeGames />
      <GameCategories />
      <div className="absolute bg-[#0000003c] backdrop-blur-2xl   flex justify-center items-center mx-auto top-0 left-0 right-0 ">
        <ModalCountDown />
      </div>
      
    </main>
  )
}
