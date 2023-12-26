import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../firebase/firebase.config'
import { getDocs, query, collection, where, orderBy, limit } from "firebase/firestore";

export type GameData = {
    id: string;
    title: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameData[]>
) {
    // Check if the incoming request method is GET
    if(req.method === "GET"){
        const { searchInput } = req.body; // Access searchInput from the request body
        
        if (typeof searchInput === "string") {
            try {
                const searchQuery = query(
                    collection(db, "games"),
                    where("title", ">=", searchInput),
                    orderBy("title"),
                    limit(6)
                );
                
                const searchSnapshot = await getDocs(searchQuery);
                const searchResultsData: GameData[] = searchSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title // Include the 'title' property explicitly
                }));
                console.log(searchResultsData)

                res.status(200).json(searchResultsData);
            } catch (error) {
                console.error("Error fetching search: ", error);
                res.status(500).json([]);
            }
        } else {
            res.status(400).json([]);
        }
    } else {
        res.status(405).json([]);
    }
}
