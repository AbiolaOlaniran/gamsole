// Import the necessary modules
"use client"
// Import the necessary modules
import { useState, useEffect } from 'react';
import { AiOutlineLike, AiFillLike, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { db } from '@/app/firebase/firebase.config';
import { QuerySnapshot, doc, getDoc, query, collection, where, limit, orderBy, getDocs, DocumentData } from "firebase/firestore";
import Image from 'next/image';
import { getDatabase, ref, get, set, increment } from "firebase/database";
import SmallGameCard from '@/components/SmallGameCard';

type Category = {
  categories: string[];
}


interface RelatedGameData extends GameData {
  id: string;
}

interface GameData {
  categories: Category;
  description: string;
  gameLink: string;
  imageUrl: string;
  title: string;
  videoUrl: string;
}

const initialState: GameData = {
  categories: { categories: [] },
  description: "",
  gameLink: "",
  imageUrl: "",
  title: "",
  videoUrl: "",
}

const Page = ({ params }: { params: { id: string } }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [like, setLike] = useState<number>(0);
  const [showAd, setShowAd] = useState(true);
  const [adTime, setAdTime] = useState(20); // Total duration of the ad in seconds
  const [gameData, setGameData] = useState<GameData>(initialState);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Store and retrieve liked status from local storage
  const localStorageKey = `liked:${params.id}`;
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Store related games in state
  const [relatedGames, setRelatedGames] = useState<RelatedGameData[]>([]);

  // Function to handle play button click
  const handlePlayButton = () => {
    setIsPlayed(true);
  };

  // Function to handle skip ad button click
  const handleSkipAd = () => {
    setShowAd(false);
  };

  // Function to enter fullscreen mode
  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  // Function to exit fullscreen mode
  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
    setIsFullscreen((prevState) => !prevState);
  };

  // Generate a random visitor ID and store it in local storage
  const visitorId = localStorage.getItem("visitorId") || Math.random().toString(36).substring(7);
  localStorage.setItem("visitorId", visitorId);

  // Retrieve the game ID from the URL parameters
  const gameId = params.id;

  // Function to handle the like button click
  const handleLikeBtn = async () => {
    // Check if the user already liked the game
    if (isLiked) {
      // If the user already liked, remove the like
      setIsLiked(false);
      setLike((prevLikes) => prevLikes - 1);
      setLocalStorageLikedStatus(false);
      const likesRef = ref(getDatabase(), `likes/${gameId}`);
      set(likesRef, increment(-1));
    } else {
      // If the user has not liked, add the like
      setIsLiked(true);
      setLike((prevLikes) => prevLikes + 1);
      setLocalStorageLikedStatus(true);
      const likesRef = ref(getDatabase(), `likes/${gameId}`);
      set(likesRef, increment(1));
    }
  };

  // Function to set liked status in local storage
  const setLocalStorageLikedStatus = (status: boolean) => {
    const likedData = localStorage.getItem(localStorageKey);
    if (likedData) {
      const likedObj = JSON.parse(likedData);
      likedObj[visitorId] = status;
      localStorage.setItem(localStorageKey, JSON.stringify(likedObj));
    } else {
      const likedObj = { [visitorId]: status };
      localStorage.setItem(localStorageKey, JSON.stringify(likedObj));
    }
  };

  // Function to fetch liked status from local storage
  const fetchLocalStorageLikedStatus = () => {
    const likedData = localStorage.getItem(localStorageKey);
    if (likedData) {
      const likedObj = JSON.parse(likedData);
      setIsLiked(likedObj[visitorId] || false);
    }
  };

  // Function to fetch game data from Firebase
  const fetchGameData = async () => {
    const gameRef = doc(db, "games", gameId);
    const gameSnapshot = await getDoc(gameRef);
    const gameObject = gameSnapshot.data() as GameData;
    setGameData(gameObject);
  };

// Function to fetch related games from Firebase based on categories
const fetchRelatedGames = async () => {
  const gameRef = doc(db, "games", params.id);
  const gameSnapshot = await getDoc(gameRef);
  const gameObject = gameSnapshot.data() as GameData;

  // Fetch related games based on categories
  let relatedGamesSnapshot: QuerySnapshot<DocumentData> | undefined;

  // Check if categories property is defined and is an array and it's not empty
  if (gameObject.categories && Array.isArray(gameObject.categories) && gameObject.categories.length > 0) {
    try {
      relatedGamesSnapshot = await getDocs(
        query(
          collection(db, 'games'),
          where('categories', 'array-contains-any', gameObject.categories),
          limit(8), // Limit to 8 random related games
          orderBy('title') // You can use any sorting criteria you prefer
        )
      );

      // Check if relatedGamesSnapshot is defined and contains documents
      if (relatedGamesSnapshot?.docs?.length > 0) {
        const relatedGamesData = relatedGamesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RelatedGameData[];

        setRelatedGames(relatedGamesData);
      } else {
        setRelatedGames([]); // If no related games found, set an empty array
      }
    } catch (error) {
      console.error('Error fetching related games:', error);
    }
  } else {
    setRelatedGames([]); // If no categories or related games found, set an empty array
  }
};


  useEffect(() => {
    const adTimer = setInterval(() => {
      setAdTime((prevTime) => prevTime - 1);
    }, 1000);

    if (adTime === 0) {
      setShowAd(false);
      clearTimeout(adTimer);
    }

    return () => {
      clearTimeout(adTimer);
    };
  }, [adTime]);

  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAd(false);
    }, adTime * 1000); // Adjust the duration of the ad (in milliseconds) here

    fetchGameData();
    return () => {
      clearTimeout(adTimer);
    };
  }, []);

  useEffect(() => {
    // Fetch the liked status from local storage
    fetchLocalStorageLikedStatus();

    const fetchLikes = async () => {
      const likesRef = ref(getDatabase(), `likes/${gameId}`);
      const likesSnapshot = await get(likesRef);
      const likesValue = likesSnapshot.val();
      if (likesSnapshot.exists()) {
        setLike(likesValue);
      }
    };

    fetchLikes();
    fetchRelatedGames();
  }, [gameId]);

  return (
    <div className="md:flex block space-y-14 mx-4 my-7 gap-5">
      <div className={!isFullscreen ? `h-[100vh]  md:h-[600px] relative md:w-[75%] lg:w-[65%]` : `h-[100vh] md:h-[600px] relative md:w-[100%]`}>
        {/* Show the ad video */}
        {!gameData.videoUrl &&(<div className="w-full h-full bg-black" />)
        }
        {showAd && gameData.videoUrl && (
          <div className="relative  w-full h-full">
            <video
              autoPlay
              loop
              muted
              className="rounded-lg object-contain w-full h-full"
            >
              <source src={gameData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white">
              <p>{adTime} sec</p>
              <button
                onClick={handleSkipAd}
                className="py-2 px-4 rounded-md bg-white text-black hover:bg-gray-200 transition-colors duration-300"
              >
                Skip Ad
              </button>
            </div>
          </div>
        )}

        {/* Show the play button */}
        {!isPlayed && !showAd && (
          <div>
            <div className="absolute flex flex-col mx-auto items-center justify-center top-0 bottom-0 right-0 left-0 z-10 bg-[#0e070f14] backdrop-blur-xl">
              <div className="h-[200px]">
                <Image
                  className="rounded-md"
                  src={gameData.imageUrl}
                  width={250}
                  height={100}
                  alt={gameData.title}
                />
              </div>

              <p className="text-2xl font-bold mt-4">{gameData.title}</p>
              <button
                onClick={handlePlayButton}
                className="py-4 px-8 mt-3 rounded-lg bg-[#8a27cd]"
              >
                Play Now
              </button>
            </div>
            {gameData.videoUrl && (
              <video
                autoPlay
                loop
                muted
                className="rounded-lg object-cover w-full h-full"
              >
                <source src={gameData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* Show the game iframe */}
        {isPlayed && (
          <div className={`w-full ${isFullscreen ? 'h-screen' : 'h-full'}`}>
            <iframe
              src={gameData.gameLink}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Fullscreen toggle button */}
        {isPlayed && (
          <div className="absolute md:block hidden top-4 right-4">
            <button
              onClick={toggleFullscreen}
              className="py-2 px-4 rounded-md bg-white text-black hover:bg-gray-200 transition-colors duration-300"
            >
              {isFullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
            </button>
          </div>
        )}

        {gameData && (
          <div className="flex items-center">
            <div
              onClick={handleLikeBtn}
              className={`py-3 cursor-pointer bg-[${like === 0 ? '#875c97' : '#3e1e62'}]`}
            >
              {like === 0 ? <AiOutlineLike size={30} /> : <AiFillLike size={30} />}
            </div>
            <p className="text-white text-center ml-2">{like} likes</p>
          </div>
        )}
      </div>
      {/* Display 4 random games in the same category */}
      <div className="h-screen md:overflow-y-scroll xl:overflow-y-hidden ">
        <div className="grid justify-center sm:grid-cols-2 xl:justify-start md:grid  items- xl:grid-cols-2 gap-4">
          {relatedGames.map((relatedGame) => (
            <SmallGameCard
              key={relatedGame.id}
              smallImageUrl={relatedGame.imageUrl}
              title={relatedGame.title}
              videoUrl={relatedGame.videoUrl}
              gameId={relatedGame.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
