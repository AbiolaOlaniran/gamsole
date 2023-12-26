import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Prop {
  url: string;
  title: string;
  videoUrl: string;
  gameId: string;
}

const BigGameCard: React.FC<Prop> = ({ url, title, videoUrl, gameId }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);

  const handleMouseEnter = () => {
    if(!videoLoading){
      setIsHovered(true);
    }
    
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const imageLoader = document.createElement('img');
    imageLoader.src = url;
    imageLoader.onload = () => {
      setIsLoading(false);
    };
  }, [url]);

  useEffect(()=>{
    const videoLoader = document.createElement("video");
    videoLoader.src = videoUrl;
    videoLoader.onloadeddata = () =>{
      setVideoLoading(false);
    }
  },[videoUrl])

  return (
    <Link
      href={`/game/${gameId}`}
      className="md:w-[450px] w-[290px] hover:border-[3px] hover:border-[#6842FF] cursor-pointer relative h-full rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && isLoading === false ? (
        <div className="relative rounded-lg w-full h-full overflow-hidden">
          <video autoPlay muted className="rounded-lg w-full object-cover h-full">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className={`absolute bottom-0 left-0 w-full z-10 h-14 bg-black bg-opacity-50 flex items-center justify-center transition-transform duration-300 ${
              isHovered ? "transform translateY(0)" : "transform translateY(100%)"
            }`}
          >
            <p className="text-white text-lg font-semibold">{title}</p>
          </div>
        </div>
      ) : isLoading ? (
        <Skeleton
          borderRadius={'0.5rem'}
          width={'100%'}
          height={'100%'}
          highlightColor={'#373952'}
          baseColor={'#1F2030'}
          className="w-full rounded-2xl h-full"
        />
      ) : (
        <Image
          onLoad={handleImageLoad}
          src={url}
          alt={title}
          fill
          className="rounded-lg object-cover"
        />
      )}
    </Link>
  );
};

export default BigGameCard;
