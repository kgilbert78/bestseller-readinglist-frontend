import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "./App.css";

// type NYTCategoryNames = Array<NYTCategory["display_name"]>;

export const SideNav = () => {
  return (
    <div className="sidebar">
      <Menu menuButton={<MenuButton>Jump to a category</MenuButton>}>
        <MenuItem>Selection</MenuItem>
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
