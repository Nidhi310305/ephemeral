import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Ephemeral</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/imagine">Create</Link></li>
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/ai-tailor">AI Tailor</Link></li>
        <li><Link to="/fabric-guide">Fabric Guide</Link></li>
      </ul>
      <Link to="/imagine" className="navbar-btn">Start Creating</Link>
    </nav>
  )
}

export default Navbar




