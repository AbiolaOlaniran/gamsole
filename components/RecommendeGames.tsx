"use client"
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../app/firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RecomCard from './RecomCard';

interface GameData {
  gameId: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  isRecommended: boolean;
}

interface Props {
  rowID: string;
}

export const slideLeft = ({ rowID }: Props) => {
  const handleClick = () => {
    const slider = document.getElementById('slider' + rowID);
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  return handleClick;
};

export const slideRight = ({ rowID }: Props) => {
  const handleClick = () => {
    const slider = document.getElementById('slider' + rowID);
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return handleClick;
};

const RecommendeGames: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [recommendedGames, setRecommendedGames] = useState<GameData[]>([]);

  useEffect(() => {
    // Function to fetch the recommended games from Firestore
    const fetchRecommendedGames = async () => {
      try {
        const gamesRef = collection(db, 'games');
        const q = query(gamesRef, where('isRecommended', '==', true));
        const querySnapshot = await getDocs(q);

        // Get an array of GameData objects with the id property included
        const gamesData: GameData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as GameData;
          return { ...data, gameId: doc.id }; // Include the gameId from the doc id
        });

        // Process the recommended games and add the gameId to the smallImageUrls array
        const processedGamesData = gamesData.map((game) => {
          return {
            ...game,
            smallImageUrls: gamesData
              .filter((g) => g.gameId !== game.gameId)
              .slice(0, 4)
              .map((g) => g.imageUrl),
          };
        });

        setRecommendedGames(processedGamesData);
      } catch (error) {
        console.error('Error fetching recommended games:', error);
      }
    };

    fetchRecommendedGames();
  }, []);

  // Function to split the recommended games into groups of five (one big card and four small cards)
  const splitGamesIntoSets = (games: GameData[]): { bigCardGame: GameData; smallCardGames: GameData[] }[] => {
    const gameSets: { bigCardGame: GameData; smallCardGames: GameData[] }[] = [];
    for (let i = 0; i < games.length; i += 5) {
      const bigCardGame = games[i];
      const smallCardGames = games.slice(i + 1, i + 5).map((game) => ({ ...game, gameId: game.gameId })); // Add a unique index to the gameId
      gameSets.push({ bigCardGame, smallCardGames });
    }
    return gameSets;
  };

  return (
    <section className="my-10 ">
      <p className="py-2 font-bold text-lg">Recommended Games</p>
      <div className="relative flex items-center group my-2">
        <MdChevronLeft
          onClick={slideLeft({ rowID: 'recom' })}
          className="bg-white left-0 text-[#000] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div ref={sliderRef} id={'slider' + 'recom'} className="gap-2 scroll-smooth overflow-x-auto scrollbar-hide flex">
          {splitGamesIntoSets(recommendedGames).map(({ bigCardGame, smallCardGames }, index) => (
            <RecomCard
              key={index}
              url={bigCardGame.imageUrl}
              title={bigCardGame.title}
              videoUrl={bigCardGame.videoUrl}
              gameId={bigCardGame.gameId}
              smallImageUrls={smallCardGames.map((game) => ({
                imageUrl: game.imageUrl,
                gameId: game.gameId,
              }))}
            />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight({ rowID: 'recom' })}
          className="bg-white text-[#000] right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </section>
  );
};

export default RecommendeGames;
