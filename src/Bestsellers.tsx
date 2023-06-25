// import { useEffect } from "react";
import { BestsellerCategory } from "./App";
import "./App.css";
import "@szhsin/react-menu/dist/index.css";

interface Props {
  bestsellerList: BestsellerCategory[] | null;
}

export const Bestsellers = ({ bestsellerList }: Props) => {
  if (bestsellerList) {
    return (
      <div className="d-flex flex-row" id="top">
        <div id="bestsellerLists" className="topMargin">
          {bestsellerList.map((category, catIndex) => {
            return (
              <div key={category.id}>
                {/* remove topMargin from first category title but not the rest */}
                <h2
                  style={catIndex === 0 ? { marginTop: 0 } : { marginTop: 20 }}
                >
                  {category.name}
                </h2>
                <div>
                  {category.books.map((book) => {
                    return (
                      <div key={book.isbn}>
                        <div>
                          <div className="coverImgDiv">
                            <a href={`${book.amazonLink}`} target="_blank">
                              <img
                                className="coverImg"
                                alt={`cover of ${book.title}`}
                                src={
                                  book.coverImg
                                    ? book.coverImg
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
      </div> // line 18 className="d-flex flex-row" id="top"
    );
  } else {
    return (
      <div>
        <h1 style={{ marginTop: 100 }}>Loading...</h1>
      </div>
    );
  }
};
