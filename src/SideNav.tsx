export const SideNav = () => {
  return (
    <div className="sidebar">
      <div>
        <h3
          className="topMargin"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Jump to a category &#x25BC;
        </h3>
        <>^ fix dropdown arrow size & figure out collapse without bootstrap</>
        <div id="navLinks" className="collapse"></div>
      </div>
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
