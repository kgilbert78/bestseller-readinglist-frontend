// import { useEffect } from "react";
import { Bestseller, BestsellerCategory } from "./App";
import "./App.css";
import "@szhsin/react-menu/dist/index.css";

interface BestsellerProps {
  bestsellerList: Bestseller[][] | null;
  nytCategoryNames: BestsellerCategory[] | null;
}

export const Bestsellers = ({
  bestsellerList,
  nytCategoryNames,
}: BestsellerProps) => {
  if (bestsellerList && nytCategoryNames) {
    let catList = nytCategoryNames.map((eachCat) => {
      console.log("categoryID from nytCategoryNames:", eachCat.categoryID);
      for (let eachBookGroup of bestsellerList) {
        for (
          let eachBookIndex = 0;
          eachBookIndex < eachBookGroup.length;
          eachBookIndex++
        ) {
          if (eachCat.categoryID === eachBookGroup[0].category.categoryID)
            // console.log("eachBook categoryID:", eachBook[0].category.categoryID);
            console.log(
              eachBookGroup[eachBookIndex].category.categoryID,
              eachBookGroup[eachBookIndex].title
            );
        }
      }
    });
    // let bookList = bestsellerList.map(
    //   (bookGroup: Bestseller[], index: number) => {
    //     console.log("bookGroup[index]", bookGroup[index]);
    //   }
    // );
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
                  {"books"}
                  {bestsellerList.map((bookGroup, bookGroupIndex) => {
                    // return <pre>{JSON.stringify(bookGroup)}</pre>;
                    // console.log(bookGroup);
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
                    // bestsellerList.map ends with })} on next line
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
