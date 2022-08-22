// import { useEffect } from "react";
import { Bestseller } from "./App";

interface BestsellerProps {
  bestsellerList: Bestseller[] | null;
}

export const Bestsellers = ({ bestsellerList }: BestsellerProps) => {
  // useEffect(() => {
  //   console.log("props: ", bestsellerList);
  // }, [bestsellerList]);

  if (bestsellerList) {
    console.log(bestsellerList[0].title);
    return (
      <div className="d-flex flex-row" id="top">
        <div id="bestsellerLists" className="topMargin">
          <p>Main Content</p>
          <p>{bestsellerList[0].title}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
