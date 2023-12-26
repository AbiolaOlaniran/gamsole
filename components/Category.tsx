"use client"
import React from 'react';
import SmallGameCard from './SmallGameCard';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface Props {
  categoryData: {
    games: GameData[];
    name: string;
  };
}

interface GameData {
  gameId: string;
  description: string;
  imageUrl: string;
  title: string;
  videoUrl: string;
}

const Category: React.FC<Props> = ({ categoryData }) => {
  const { games, name } = categoryData;

  const slideLeft = () => {
    const slider = document.getElementById('slider' + name);
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById('slider' + name);
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return (
    <section className="my-10">
      <p className="py-2 font-bold text-lg">{games && name}</p>
      <div className="relative flex items-center group my-2">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 text-[#000] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div id={'slider' + name} className="gap-2 scroll-smooth overflow-x-scroll scrollbar-hide flex">
          <div className="flex gap-2">
            {games?.map((game) => (
              <SmallGameCard key={game.gameId} gameId={game.gameId} title={game.title} videoUrl={game.videoUrl} smallImageUrl={game.imageUrl} />
            ))}
          </div>
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white text-[#000] right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </section>
  );
};

export default Category;
