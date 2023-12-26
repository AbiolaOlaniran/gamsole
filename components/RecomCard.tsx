"use client"
import React from 'react';
import BigGameCard from './BigGameCard';
import SmallGameCard from './SmallGameCard';

interface SmallGameData {
  imageUrl: string;
  gameId: string;
}

interface Prop {
  url: string;
  title: string;
  videoUrl: string;
  gameId: string;
  smallImageUrls: SmallGameData[];
}

const RecomCard: React.FC<Prop> = ({ url, title, videoUrl, gameId, smallImageUrls }) => {
  return (
    <div className="flex gap-2">
      {/* Big Game Card */}
      <BigGameCard url={url} title={title} videoUrl={videoUrl} gameId={gameId} />

      {/* Container for Small Game Cards */}
      <div className="flex gap-2 flex-col">
        {/* First Row of Small Game Cards */}
        <div className="flex gap-2">
          {smallImageUrls.slice(0, 2).map((smallGameData, index) => (
            <SmallGameCard
              key={index}
              smallImageUrl={smallGameData.imageUrl}
              title={title}
              videoUrl={videoUrl}
              gameId={smallGameData.gameId}
            />
          ))}
        </div>

        {/* Second Row of Small Game Cards */}
        <div className="flex gap-2">
          {smallImageUrls.slice(2, 4).map((smallGameData, index) => (
            <SmallGameCard
              key={index}
              smallImageUrl={smallGameData.imageUrl}
              title={title}
              videoUrl={videoUrl}
              gameId={smallGameData.gameId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecomCard;
