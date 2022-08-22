import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Bestsellers } from "./Bestsellers";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";
import sampleReadingList from "./sampleReadingList.json";

// NYT stuff I care about
export interface Bestseller {
  title: string;
  author: string;
  description: string;
  coverImg: string;
  amazonLink: string;
  rank: number; // rank *within* category
  // make a "Category" interface to reflect incoming data structure or is this enough?
  category: string;
  categoryDisplay: string;
}

// for/from user's reading list in my database
interface ReadingListBook {
  title: string;
  author: string;
  amazonLink: string;
  bookID: number;
  createdAt: string; // timestamp? comes in as string though.
  updatedAt: string; // timestamp? comes in as string though.
  didRead: boolean;
  category: string;
  categoryDisplay: string;
}

interface User {
  username: string;
  accessCode: string;
}

function App() {
  const [bestsellerList, setBestsellerList] =
    useState<Array<Bestseller> | null>(null);

  const loadBestsellers = useCallback(async () => {
    const response = await fetch(
      "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=jhQErSJStIHawxkBeOcyPHcP0nC3O5Dw",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const newYorkTimesData = await response.json();
    // console.log(newYorkTimesData);
    // console.log(newYorkTimesData.results.lists);
    if (!bestsellerList) {
      // setBestsellerList(newYorkTimesData.results.lists);
      for (let eachPart of newYorkTimesData) {
        // make an object that matches the format of the Bestseller interface and append to a list variable, to pass to setBestsellerList after loop finishes
      }
    }
    console.log("bestsellerList in App:", bestsellerList);
  }, [bestsellerList]); // bestsellerList

  const getReadingListFromDB = async () => {
    let dbData = sampleReadingList;
    // const response = await fetch(
    //   // "https://bestseller-readinglist-backend.herokuapp.com/userreadinglist/",
    //   "http://localhost:3008/userreadinglist/",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       username: localStorage.username,
    //       accessCode: localStorage.accessCode,
    //     },
    //     body: JSON.stringify({ userID: "localStorage.userID" }),
    //   }
    // );
    // const dbData = await response.json();
    console.log(dbData);
  };

  useEffect(() => {
    loadBestsellers();
    getReadingListFromDB();
  }, [loadBestsellers]);

  return (
    <div className="App">
      <TopNav />
      <div className="mainContent">
        <SideNav />
        <Bestsellers bestsellerList={bestsellerList} />
      </div>
    </div>
  );
}

export default App;
