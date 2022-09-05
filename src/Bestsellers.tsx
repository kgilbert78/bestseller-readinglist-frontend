// import { useEffect } from "react";
import { NYTCategory, NYTBook, NYTBuyLink, Bestseller } from "./App";
import "./App.css";

interface BestsellerProps {
  bestsellerList: Bestseller[] | null;
  NYTList: NYTCategory[] | null;
}

export const Bestsellers = ({ NYTList, bestsellerList }: BestsellerProps) => {
  if (NYTList) {
    console.log("bestsellerList in Bestsellers.tsx:", NYTList);
    return (
      <div className="d-flex flex-row" id="top">
        <div id="bestsellerLists" className="topMargin">
          {NYTList.map((category) => {
            return (
              <div>
                <h2>{category.display_name}</h2>
                <div>
                  {category.books.map((book) => {
                    return (
                      <div>
                        <div>
                          <div className="coverImgDiv">
                            <a
                              href={`${book.buy_links[0].url}`}
                              target="_blank"
                            >
                              <img className="coverImg" src={book.book_image} />
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
    return <h1 style={{ marginTop: 100 }}>Loading...</h1>;
  }
};
