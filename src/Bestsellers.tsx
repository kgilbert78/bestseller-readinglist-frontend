// import { useEffect } from "react";
import { Bestseller, BestsellerCategory } from "./App";
import "./App.css";
import "@szhsin/react-menu/dist/index.css";

interface BestsellerProps {
  bestsellerList: Bestseller[] | null;
  nytCategoryNames: BestsellerCategory[] | null;
}

export const Bestsellers = ({
  bestsellerList,
  nytCategoryNames,
}: BestsellerProps) => {
  if (bestsellerList && nytCategoryNames) {
    // console.log("bestsellerList in Bestsellers.tsx:", nytList);
    return (
      <div className="d-flex flex-row" id="top">
        <div id="bestsellerLists" className="topMargin">
          {nytCategoryNames.map((category, catIndex) => {
            return (
              <div key={category.categoryID}>
                {/* remove topMargin from first category title but not the rest */}
                <h2
                  style={catIndex === 0 ? { marginTop: 0 } : { marginTop: 20 }}
                >
                  {category.categoryName}
                </h2>
                <div>
                  {bestsellerList.map((bookGroup, bookGroupIndex) => {
                    // return <pre>{JSON.stringify(bookGroup)}</pre>;
                    console.log(bookGroup);
                    // console.log(bookGroup[bookGroupIndex]);
                    return <pre>{"bookdata here"}</pre>;
                    // fix typing and for each bookGroup, display like this:
                    // <div>
                    //   {bookGroup[bookGroupIndex].map((book) => {
                    //     return (
                    //       <div key={book.amazonLink}>
                    //         <div>
                    //           <div className="coverImgDiv">
                    //             <a href={`${book.amazonLink}`} target="_blank">
                    //               <img
                    //                 className="coverImg"
                    //                 src={
                    //                   book.coverImg
                    //                     ? book.coverImg
                    //                     : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
                    //                 }
                    //                 // make my own replacement image for unavailable covers!
                    //               />
                    //             </a>
                    //           </div>
                    //           <div>
                    //             {book.rank}. {book.title}, by {book.author}
                    //             <br />
                    //             {book.description}
                    //           </div>
                    //         </div>
                    //       </div>
                    //     );
                    //   })}
                    // </div>;
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
