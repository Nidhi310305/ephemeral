import { useNavigate } from 'react-router-dom'

function FeatureCard({ title, description, icon, path }) {
  const navigate = useNavigate()

  return (
    <div className="feature-card" onClick={() => navigate(path)} style={{ cursor: 'pointer' }}>
      <span className="feature-icon">{icon}</span>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  )
}

export default FeatureCard
