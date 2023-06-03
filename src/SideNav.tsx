import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { BestsellerCategory } from "./App";
import "./App.css";

interface Props {
  nytCategoryNames: BestsellerCategory[] | null;
}

export const SideNav = ({ nytCategoryNames }: Props) => {
  return (
    <div className="sidebar" style={{ marginTop: 120 }}>
      <Menu
        menuButton={<MenuButton>Jump to a category:</MenuButton>}
        overflow="auto"
        position="anchor"
      >
        {nytCategoryNames?.map((category) => {
          return (
            <MenuItem key={category.categoryID}>
              {category.categoryName}
            </MenuItem>
          );
        })}
      </Menu>

      <div id="readingList" className="mt-5">
        <h3>My Reading List</h3>
        <ul id="booksToRead">
          <li>Nothing to read yet! </li>
          <li>Login to create a saved reading list...</li>
          <li>
            or try it out here first! (Reading list clears when you leave the
            page.)
          </li>
        </ul>
        <h3>Books I Have Read</h3>
        <ul id="booksIHaveRead"></ul>
      </div>
    </div>
  );
};
