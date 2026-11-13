import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import useSeo from './hooks/useSeo'
import Header from './components/Header/Header'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Hero from './components/Hero/Hero'
import Narrative from './components/Narrative/Narrative'
import Work from './components/Work/Work'
import Products from './components/Products/Products'
import Capabilities from './components/Capabilities/Capabilities'
import Testimonial from './components/Testimonial/Testimonial'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import CookieBanner from './components/CookieBanner/CookieBanner'
import './App.css'

// Loaded on demand: the WebGL background and the secondary pages are large,
// so keeping them out of the first download makes the home page appear faster.
const Dither = lazy(() => import('./components/Dither'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const POS = lazy(() => import('./components/POS/POS'))

function Home() {
  useSeo({
    title: 'Clever Project | Software Development Company in Sri Lanka',
    description: 'Sri Lankan software studio building POS systems, e-commerce, web and mobile apps with AI. Home of AmigoTap, Mobile POS, Petty Cash and Fix It.',
    path: '/'
  })

  return (
    <div className="app-container">
      <CustomCursor />
      {/* Dither Background - Full screen, receives pointer events */}
      <div className="dither-background">
        <Suspense fallback={null}>
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
        </Suspense>
      </div>

      {/* Content layer - pointer events pass through to Dither */}
      <div className="content-layer">
        <Header />
        <main>
          <Hero />
          <Narrative />
          <Products />
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

// Start each page at the top when moving between pages (not for #section links)
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/pos" element={<POS />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
