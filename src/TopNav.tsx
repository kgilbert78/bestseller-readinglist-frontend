export const TopNav = () => {
  return (
    <nav className="fixedNav">
      <h1>This Week's New York Times Bestseller List</h1>
      <div>
        <a href="login.html">
          <button className="loginButton">Login here!</button>
        </a>
        <a href="create-account.html">
          <button className="signUpButton">Sign up!</button>
        </a>
      </div>
    </nav>
  );
};
