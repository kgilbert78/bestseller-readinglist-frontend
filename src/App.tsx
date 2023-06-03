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
  const [nytList, setNYTList] = useState<Array<NYTCategory> | null>(null);
  const [nytCategoryNames, setNYTCategoryNames] =
    useState<Array<BestsellerCategory> | null>(null);
  const [bestsellerList, setBestsellerList] =
    useState<Array<Bestseller> | null>(null);

  const loadBestsellers = useCallback(async () => {
    console.log("loadBestsellers ran", bestsellerList);
    // use localstorage for this, with timestamp to compare if fetch needed
    // console.log(newYorkTimesData);
    // console.log(newYorkTimesData.results.lists);
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
      // setNYTList(newYorkTimesData.results.lists);

      const filteredCategories = newYorkTimesData.results.lists.map(
        (categories: NYTCategory) => {
          return {
            categoryID: categories.list_id,
            categoryName: categories.display_name,
          };
        }
      );
      localStorage.setItem("categoryData", JSON.stringify(filteredCategories));
      // console.log(
      //   "categories in storage",
      //   localStorage.getItem("categoryData")
      // );

      const filteredBooks = newYorkTimesData.results.lists.map(
        (categories: NYTCategory) => {
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
        }
      );

      // figure out how to handle this in filteredBooks()
      let combinedInnerLists = filteredBooks.map((list: Bestseller[]) => {
        return list;
      });

      localStorage.setItem("bookData", JSON.stringify(combinedInnerLists));
      setBestsellerList(combinedInnerLists);

      console.log("NYTData retrieved and saved to localStorage");
    } else {
      console.log("Bestseller data already available in localStorage");
    }
    // console.log("from localstorage", localStorage.getItem("bookData"));

    let categoriesFromStorage = localStorage.getItem("categoryData");
    console.log("categoriesFromStorage", categoriesFromStorage);

    if (categoriesFromStorage) {
      let categoryDataObj = JSON.parse(categoriesFromStorage);
      // console.log("categoryDataObj:", categoryDataObj);
      setNYTCategoryNames(categoryDataObj);
      // console.log("nytCategoryNames", nytCategoryNames);
    }

    let bookDataFromStorage = localStorage.getItem("bookData");
    if (bookDataFromStorage) {
      let bookDataObj = JSON.parse(bookDataFromStorage);
      setBestsellerList(bookDataObj);
      console.log("bookDataObj from storage:", bookDataObj);
    }
    // console.log("bestsellerList in App:", nytList);
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
        <SideNav nytCategoryNames={nytCategoryNames} />
        <Bestsellers
          nytCategoryNames={nytCategoryNames}
          bestsellerList={bestsellerList}
        />
      </div>
    </div>
  );
}

export default App;
