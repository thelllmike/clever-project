import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Hero from './components/Hero/Hero'
import Narrative from './components/Narrative/Narrative'
import Work from './components/Work/Work'
import Capabilities from './components/Capabilities/Capabilities'
import Testimonial from './components/Testimonial/Testimonial'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import CookieBanner from './components/CookieBanner/CookieBanner'
import Dither from './components/Dither'
import Projects from './components/Projects/Projects'
import POS from './components/POS/POS'
import './App.css'

function Home() {
  return (
    <div className="app-container">
      <CustomCursor />
      {/* Dither Background - Full screen, receives pointer events */}
      <div className="dither-background">
        <Dither
          waveColor={[0.486, 0.227, 0.929]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.2}
          colorNum={5}
          pixelSize={2}
          waveAmplitude={0.3}
          waveFrequency={2.5}
          waveSpeed={0.1}
        />
      </div>

      {/* Content layer - pointer events pass through to Dither */}
      <div className="content-layer">
        <Header />
        <main>
          <Hero />
          <Narrative />
          <Work />
          <Capabilities />
          <Testimonial />
          <CTA />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pos" element={<POS />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
