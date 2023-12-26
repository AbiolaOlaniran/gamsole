"use client"
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../app/firebase/firebase.config';
import Loading from './loading';

interface GameData {
  gameId: string;
  description: string;
  // gameLink: string;
  imageUrl: string;
  title: string;
  videoUrl: string;
}

interface CategoriesData {
  games: GameData[];
  name: string;
}

const GameCategories = () => {
  const [categories, setCategories] = useState<CategoriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

  const fetchCategoriesData = async () => {
    try {
      const categoriesRef = collection(db, 'categories');
      const querySnapshot = await getDocs(categoriesRef);
      const categoriesData: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());
      const convertedCategoriesData: CategoriesData[] = categoriesData.map((docData: DocumentData) => {
        return {
          games: docData.games as GameData[],
          name: docData.name as string,
        };
      });
      setCategories(convertedCategoriesData);
      setIsLoading(false); // Data fetched, set isLoading to false
    } catch (error) {
      console.error('Error fetching categories data from Firestore:', error);
      setIsLoading(false); // In case of error, set isLoading to false
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return (
    <div>
      {isLoading ? ( // Check if loading, show loading state
        <Loading />
      ) : (
        // Data loaded, render categories
        categories.map((category) => <Category key={category.name} categoryData={category} />)
      )}
    </div>
  );
};

export default GameCategories;
