import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Loader from "./Loader";

type SmallImageUrlProp = {
  smallImageUrl: string;
  title: string;
  videoUrl: string;
  gameId: string;
};

const SmallGameCard = ({ smallImageUrl, title, videoUrl, gameId }: SmallImageUrlProp) => {
  const [isHovered, setIsHovered] = useState(false);
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
    const imageLoader = document.createElement("img");
    imageLoader.src = smallImageUrl;
    imageLoader.onload = () => {
      setIsLoading(false);
    };
    
  }, [smallImageUrl]);

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
      className="w-[200px] hover:border-[3px] hover:border-[#6842FF] cursor-pointer md:w-[220px] relative h-[100px] md:h-[130px] rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      { videoLoading === false && (isHovered && isLoading === false) ? (
        <div className="relative rounded-lg w-full h-full overflow-hidden">
          <video autoPlay muted className="rounded-lg object-cover w-full h-full">
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
        <Skeleton borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
      ) : (
        <Image
          onLoad={handleImageLoad}
          src={smallImageUrl}
          alt=""
          fill
          className="rounded-lg w-auto object-cover"
        />
      )}
      
    </Link>
  );
};

export default SmallGameCard;
