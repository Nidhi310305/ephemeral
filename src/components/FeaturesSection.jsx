import FeatureCard from "./FeatureCard"
import "./FeaturesSection.css"

const features = [
  { title: "Imagine to Life", description: "Describe your outfit and watch it come alive as a design.", icon: "✨", path: "/imagine" },
  { title: "AI Tailor", description: "Conversational AI consultant that generates your tailor brief.", icon: "👔", path: "/ai-tailor" },
  { title: "Fabric Guide", description: "AI-powered fabric recommendations based on your design.", icon: "🪡", path: "/fabric-guide" },
  { title: "Try It On", description: "Virtual try-on with front, back and side views.", icon: "👗", path: "/try-on" },
  { title: "My Collection", description: "Save and manage all your designs in one place.", icon: "🗂️", path: "/collection" },
]


function FeaturesSection() {
  return (
    <div className="features">
      <h2 className="features-heading">What Ephemeral Can Do</h2>
      <div className="features-grid">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            path={feature.path}
          />
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
