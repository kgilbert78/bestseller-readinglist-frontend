// import { useEffect } from "react";
import { Bestseller, BestsellerCategory } from "./App";
import "./App.css";
import "@szhsin/react-menu/dist/index.css";

interface Props {
  bestsellerList: BestsellerCategory[] | null;
}

export const Bestsellers = ({ bestsellerList }: Props) => {
  if (bestsellerList) {
    let catList = bestsellerList.map((eachCat) => {
      // console.log("categoryID from nytCategoryNames:", eachCat.categoryID);
      // for (let eachBookGroup of bestsellerList) {
      //   for (
      //     let eachBookIndex = 0;
      //     eachBookIndex < eachBookGroup.length;
      //     eachBookIndex++`
      //   ) {
      //     if (eachCat.categoryID === eachBookGroup[0].category.categoryID)
      //       // console.log("eachBook categoryID:", eachBook[0].category.categoryID);
      //       console.log(
      //         eachBookGroup[eachBookIndex].category.categoryID,
      //         eachBookGroup[eachBookIndex].title
      //       );
      //   }
      // }
    });
    // let bookList = bestsellerList.map(
    //   (bookGroup: Bestseller[], index: number) => {
    //     console.log("bookGroup[index]", bookGroup[index]);
    //   }
    // );
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
