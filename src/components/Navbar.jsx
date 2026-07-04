import "./Navbar.css";
function Navbar() {
   return(
    <nav className="navbar">
        <h1 className="navbar-logo">Ephemeral</h1>
        <ul className="navbar-links">
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
        </ul>
        <button className="navbar-btn">Start Creating</button>
    </nav>
   )
}
export default Navbar;
