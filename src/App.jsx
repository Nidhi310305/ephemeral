import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import ImagineToLife from './components/ImagineToLife'
import MyCollection from './components/MyCollection'

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
      </Routes>
      <Footer />
    </div>
  )
}

export default App
