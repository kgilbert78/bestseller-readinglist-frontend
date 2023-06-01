// import { useEffect } from "react";
import { NYTCategory, NYTBook, NYTBuyLink, Bestseller } from "./App";
import "./App.css";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

interface BestsellerProps {
  bestsellerList: Bestseller[] | null;
  nytList: NYTCategory[] | null;
}

export const Bestsellers = ({ nytList, bestsellerList }: BestsellerProps) => {
  if (nytList) {
    // console.log("bestsellerList in Bestsellers.tsx:", nytList);
    return (
      <div className="d-flex flex-row" id="top">
        <div id="bestsellerLists" className="topMargin">
          {nytList.map((category, catIndex) => {
            return (
              <div key={category.list_id}>
                {/* remove topMargin from first category title but not the rest */}
                <h2
                  style={catIndex === 0 ? { marginTop: 0 } : { marginTop: 20 }}
                >
                  {category.display_name}
                </h2>
                <div>
                  {category.books.map((book) => {
                    return (
                      <div key={book.book_uri}>
                        <div>
                          <div className="coverImgDiv">
                            <a
                              href={`${book.buy_links[0].url}`}
                              target="_blank"
                            >
                              <img
                                className="coverImg"
                                src={
                                  book.book_image
                                    ? book.book_image
                                    : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
                                }
                                // make my own replacement image for unavailable covers!
                              />
                            </a>
                          </div>
                          <div>
                            {book.rank}. {book.title}, by {book.author}
                            <br />
                            {book.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 style={{ marginTop: 100 }}>Loading...</h1>
      </div>
    );
  }
};
