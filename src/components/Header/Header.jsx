import './Header.css'
import GlassSurface from '../GlassSurface'
import Button from '../Button/Button'
import logo from '../../assets/logo.png'

function Header() {
    return (
        <GlassSurface
            className="header"
            width="min(1200px, 90%)"
            height="auto"
            borderRadius={40}
            borderWidth={0}
            opacity={0.8}
            blur={12}
            displace={0.3}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            mixBlendMode="screen"
            style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100
            }}
        >
            <div className="container">
                <nav className="nav">
                    <a href="#" className="logo-link">
                        <img src={logo} alt="AGENXY.MEDIA" className="logo" />
                    </a>

                    <div className="nav-center">
                        <ul className="nav-links">
                            <li><a href="#work" className="nav-link">Work</a></li>
                            <li><a href="#process" className="nav-link">Process</a></li>
                            <li><a href="#capabilities" className="nav-link">Capabilities</a></li>
                        </ul>
                    </div>

                    <div className="nav-right">
                        <span className="nav-status">
                            <span className="status-dot"></span>
                            <span className="mono">Available</span>
                        </span>
                        <Button href="https://forms.gle/fVeCoSrFoSi55Mww9" target="_blank" rel="noopener noreferrer" variant="primary">
                            Start Project
                        </Button>
                    </div>

                    <button className="mobile-menu-btn" aria-label="Menu">
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </div>
        </GlassSurface>
    )
}

export default Header
