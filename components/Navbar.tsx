"use client"
import { GameData } from '@/app/api/searchGames';
import { useSearchGames } from '@/hooks/useSearchGames';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RxMagnifyingGlass } from "react-icons/rx";
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase.config';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredGames, setFilteredGames] = useState<GameData[]>([]);
  const [allGames, setAllGames] = useState<GameData[]>([]);

  useEffect(() => {
    async function fetchGamesData() {
      try {
        const gamesCollection = collection(db, 'games');
        const gamesQuery = query(gamesCollection);
        const gamesSnapshot = await getDocs(gamesQuery);

        const gamesData: GameData[] = gamesSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));

        setAllGames(gamesData);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    }

    fetchGamesData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchInput(userInput);

    // Perform client-side filtering
    const filtered = allGames.filter((game) =>
      game.title.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredGames(filtered);
  };

  return (
    <nav className='bg-[#1f2030ea] z-30 sticky left-0 right-0 top-0 '>
      <div className="flex flex-col md:flex-row sticky z-20 top-0 backdrop-blur-lg items-center px-4 sm:px-6 md:px-10  md:justify-around">
        <Link href={"/"} className="flex gap-2 items-center">
          <Image 
            src={"/logo.png"}
            alt={"logo"}
            width={30}
            height={30}
          />
          <p className="font-bold hidden md:block text-xl">Gamsole</p>
        </Link>

        <form className="my-2 px-3 w-[300px] md:w-[500px] items-center bg-[#373952] rounded-3xl flex">
          <input
            onChange={(e) => handleSearchChange(e)}
            type="text"
            value={searchInput}
            className="h-full rounded-3xl w-full flex-2 placeholder:font-bold outline-none px-4 bg-[#373952] py-3"
            placeholder="Search"
          />
          <RxMagnifyingGlass
            size={35}
            className="hover:bg-gray-500 cursor-pointer rounded-full p-1"
          />
        </form>
      </div>

      {searchInput && (
        <div className='bg-[#1f2030ea] fixed left-0 right-0 z-10 text-center max-h-[350px] overflow-y-auto'>
          {filteredGames.length === 0 ? (
            <p className='p-3 bg-[#1f2030ea] text-white'>No result found</p>
          ) : (
            <div className='grid bg-[#1f2030ea] gap-3'>
              {filteredGames.map((game) => (
                <Link
                  className='p-3 bg-[#1f2030ea] hover:bg-gray-800'
                  href={`/game/${game.id}`}
                  key={game.id}
                >
                  {game.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar;
