import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import ImagineToLife from './components/ImagineToLife'
import MyCollection from './components/MyCollection'
import AITailor from './components/AITailor'
import FabricGuide from './components/FabricGuide'
import TryItOn from './components/TryItOn'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <FeaturesSection />
          </>
        } />
        <Route path="/imagine" element={<ImagineToLife />} />
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/ai-tailor" element={<AITailor />} />
        <Route path="/fabric-guide" element={<FabricGuide />} />
        <Route path="/try-on" element={<TryItOn />} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App











