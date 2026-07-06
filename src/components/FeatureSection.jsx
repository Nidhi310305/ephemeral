import FeatureCard from "./FeatureCard";
import "./FeatureSection.css";
const features=[
    {title:'Imagine to Life',description:'Describe your outfit and watch it come alive as a design',icon:'✨'},
    {title:'Tailor Brief',description:'Auto-generated brief ready to share with your tailor.',icon:'📝'},
    {title:'Fabric Guide',description:'AI-powered fabric recommendations based on your design.',icon:'🧵'},
    {title:'Try It On',description:'Virtual try-on with front,back and side views.',icon:'👗'},
    {title:'My Collection:',description:'Save and manage all your designs in one place.',icon:'💾'},
]
function FeatureSection() {
    return(
        <div className='features'>
            <h2 className='features-heading'>What Ephemeral Offers</h2>
            <div className='features-grid'>
                {features.map((feature)=>(
                    <FeatureCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    />
                ))}
            </div>
        </div>
    )
}
export default FeatureSection;    

