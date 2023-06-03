import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Bestsellers } from "./Bestsellers";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";
import sampleReadingList from "./sampleReadingList.json";

// NYT stuff I care about
export interface Bestseller {
  isbn: number; // specify as 13 digits. use for "key" when rendering
  title: string;
  author: string;
  description: string;
  coverImg: string;
  amazonLink: string;
  rank: number; // rank *within* category
}

export interface BestsellerCategory {
  id: number;
  name: string;
  books: Bestseller[];
}

// All NYT Stuff
export interface NYTBuyLink {
  name: string;
  url: string;
}
export interface NYTBook {
  age_group: string;
  amazon_product_url: string;
  article_chapter_link: string;
  author: string;
  book_image: string;
  book_image_height: number;
  book_image_width: number;
  book_review_link: string;
  book_uri: string;
  buy_links: NYTBuyLink[]; //<Array<NYTBuyLink>>;
  contributor: string;
  contributor_note: string;
  created_date: string;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: "";
  title: string;
  updated_date: string;
  weeks_on_list: number;
}

export interface NYTCategory {
  books: NYTBook[];
  display_name: string;
  list_id: number;
  list_image: null;
  list_image_height: null;
  list_image_width: null;
  list_name: string;
  list_name_encoded: string;
  updated: string;
}

// better way to tell it what specific strings? not sure if this is doing that.
// export type NYTCategoryNames = Array<{
//   key: NYTCategory["list_id"];
//   name: NYTCategory["display_name"];
// }>;

// for/from user's reading list in my database
interface ReadingListBook {
  title: string;
  author: string;
  amazonLink: string;
  bookID: number;
  createdAt: string; // timestamp? comes in as string though.
  updatedAt: string; // timestamp? comes in as string though.
  didRead: boolean;
  category: number;
  categoryDisplay: string;
}

interface User {
  username: string;
  accessCode: string;
}

function App() {
  const [bestsellerList, setBestsellerList] =
    useState<Array<BestsellerCategory> | null>(null);

  const loadBestsellers = useCallback(async () => {
    console.log("loadBestsellers ran", bestsellerList);
    if (!localStorage.getItem("bookData")) {
      console.log("fetching NYT data...");
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=jhQErSJStIHawxkBeOcyPHcP0nC3O5Dw",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const newYorkTimesData = await response.json();

      const trimmedNYTData = newYorkTimesData.results.lists.map(
        (categories: NYTCategory) => {
          let categoryID = categories.list_id;
          let categoryName = categories.display_name;

          let booksInCategory = categories.books.map((book) => {
            return {
              isbn: book.primary_isbn13,
              title: book.title,
              author: book.author,
              description: book.description,
              coverImg: book.book_image,
              amazonLink: book.buy_links[0].url,
              rank: book.rank,
            };
          });

          return { id: categoryID, name: categoryName, books: booksInCategory };
        }
      );

      localStorage.setItem("trimmedNYTData", JSON.stringify(trimmedNYTData));
      setBestsellerList(trimmedNYTData);

      console.log("NYTData retrieved and saved to localStorage");
    } else {
      console.log("Bestseller data already available in localStorage");
    }

    let dataFromStorage = localStorage.getItem("trimmedNYTData");
    if (dataFromStorage) {
      let nytDataObj = JSON.parse(dataFromStorage);
      setBestsellerList(nytDataObj);
      console.log("nytDataObj from storage:", nytDataObj);
    }
  }, []); // bestsellerList

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
    // console.log("dbData", dbData);
  };

  useEffect(() => {
    loadBestsellers();
    getReadingListFromDB();
  }, [loadBestsellers]);

  return (
    <div className="App">
      <TopNav />
      <div className="mainContent">
        <SideNav bestsellerList={bestsellerList} />
        <Bestsellers bestsellerList={bestsellerList} />
      </div>
    </div>
  );
}

export default App;
