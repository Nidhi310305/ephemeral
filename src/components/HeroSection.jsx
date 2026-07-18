import { useNavigate } from 'react-router-dom'
import "./HeroSection.css";
function HeroSection() {
    const navigate = useNavigate();
    return(
        <div className="hero">
         <h1 className="hero-title">Ephemeral</h1>
         <p className="hero-subtitle">Every masterpiece begins as imagination </p>
         <p className="hero-tagline">The moment is ephemeral,The creation is forever.</p>
         <button className="hero-btn" onClick={() => navigate('/imagine')}>
           Start Creating
         </button>
        </div>
        
    )
}

export default HeroSection;
