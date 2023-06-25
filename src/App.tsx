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
  category: BestsellerCategory;
}

export interface BestsellerCategory {
  categoryID: number;
  categoryName: string;
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
export type NYTCategoryNames = Array<{
  key: NYTCategory["list_id"];
  name: NYTCategory["display_name"];
}>;

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
  const [nytList, setNYTList] = useState<Array<NYTCategory> | null>(null);
  const [nytCategoryNames, setNYTCategoryNames] =
    useState<NYTCategoryNames | null>(null);
  const [bestsellerList, setBestsellerList] =
    useState<Array<Bestseller> | null>(null);
  const [lastNYTFetch, setLastNYTFetch] = useState<Date | null>(null);

  const loadBestsellers = useCallback(async () => {
    console.log("loadBestsellers ran");
    console.log(
      "ts in localstorage",
      Boolean(localStorage.getItem("nytListTimestamp"))
    );
    // use localstorage for this, with timestamp to compare if fetch needed
    let ts = new Date();
    let tsFromStorage = localStorage.getItem("nytListTimestamp");
    let nytStorage = localStorage.getItem("fullNYTList");

    if (!nytList && nytStorage) {
      setNYTList(JSON.parse(nytStorage));
    }

    if (tsFromStorage) {
      ts = new Date(JSON.parse(tsFromStorage));
      setLastNYTFetch(ts);
    }

    let now = new Date();
    // fix to subtract lastNYTFetch.getTime() instead... right now lastNYTFetch could be null here
    let timeDiff = now.getTime() - ts.getTime();
    // number of milliseconds in a day is 1000*60*60*24
    let dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    let tsDay = ts.getDay();
    let today = now.getDay();

    // fetch a new list only if there isn't one in localStorage, or it's been more than 7 days, or a Sunday has passed.
    // this only reduces it to 2 fetches because nytList isn't set yet, but i need to check for nytList not nytStorage here because nytList could be null therefore couldn't be mapped over.
    if (!nytList || dayDiff > 7 || (dayDiff < 7 && tsDay > today)) {
      console.log("fetching NYT data...");
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=jhQErSJStIHawxkBeOcyPHcP0nC3O5Dw",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const newYorkTimesData = await response.json();
      localStorage.setItem(
        "fullNYTList",
        JSON.stringify(newYorkTimesData.results.lists)
      );
      localStorage.setItem("nytListTimestamp", JSON.stringify(new Date()));
      setNYTList(newYorkTimesData.results.lists);

      // for (let eachPart of newYorkTimesData) {
      //   // make an object that matches the format of the Bestseller interface and append to a list variable, to pass to setBestsellerList after loop finishes
      // }
    } else {
      console.log(
        "no need to fetch NYT data, rendering current list of books..."
      );
      const filteredCategories = nytList.map((categories, categoryIndex) => {
        return {
          categoryID: categories.list_id,
          categoryName: categories.display_name,
        };
      });
      localStorage.setItem("categoryData", JSON.stringify(filteredCategories));

      const filteredBooks = nytList.map((categories) => {
        let categoryID = categories.list_id;
        let categoryName = categories.display_name;

        let booksInCategory = categories.books.map((book) => {
          return {
            title: book.title,
            author: book.author,
            description: book.description,
            coverImg: book.book_image,
            amazonLink: book.buy_links[0].url,
            rank: book.rank,
            category: {
              categoryID: categoryID,
              categoryName: categoryName,
            },
          };
        });

        // return one list of all books
        return booksInCategory.map((book) => book);

        // this returns a list of books for each category
        // return booksInCategory;
      });
    }

    let catNameMap = nytList?.map((category: NYTCategory) => {
      const listID = category.list_id;
      const categoryName = category.display_name;
      return { key: listID, name: categoryName };
    });

    if (catNameMap) {
      setNYTCategoryNames(catNameMap);
    }
  }, [nytList]); // bestsellerList

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
  };

  useEffect(() => {
    loadBestsellers();
    getReadingListFromDB();
  }, [loadBestsellers]);

  return (
    <div className="App">
      <TopNav />
      <div className="mainContent">
        <SideNav nytCategoryNames={nytCategoryNames} />
        <Bestsellers nytList={nytList} bestsellerList={bestsellerList} />
      </div>
    </div>
  );
}

export default App;
