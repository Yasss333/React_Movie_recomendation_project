

import { Client, Databases, Query, ID } from "appwrite";

const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const database_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const metric = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(project_id);

const database = new Databases(client);

export const updatecounter = async (SearchTerm, movie) => {
  try {
    const result = await database.listDocuments(database_ID, metric, [
      Query.equal("SearchTerm", SearchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(database_ID, metric, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(database_ID, metric, ID.unique(), {
        SearchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Appwrite error:", error);
  }
};

export  const  getTrendingMovies=async()=>{
    try {
      const result= await database.listDocuments(database_ID,metric,[
        Query.limit(5),
        Query.orderDesc("count")
      ])
      console.log("Trenidng movies",result.documents);
      
      return result.documents
    } catch (error) {
      console.log(error);
      
    }
  }