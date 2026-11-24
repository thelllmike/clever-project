import './HireUs.css'

const platforms = [
    { name: 'Fiverr', href: 'https://www.fiverr.com/indurukeshara', mark: 'fi', className: 'hire-btn--fiverr' },
    { name: 'Upwork', href: 'https://www.upwork.com/freelancers/~01a953c0b6e3acd5b5?mp_source=share', mark: 'up', className: 'hire-btn--upwork' },
]

/** "Hire us on Fiverr / Upwork" buttons. `size="sm"` is a compact version for the footer. */
function HireUs({ size = 'md', className = '' }) {
    return (
        <div className={`hire-us hire-us--${size} ${className}`.trim()}>
            {platforms.map(p => (
                <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hire-btn ${p.className}`}
                    aria-label={`Hire us on ${p.name} (opens in a new tab)`}
                >
                    <span className="hire-btn-mark" aria-hidden="true">{p.mark}</span>
                    <span className="hire-btn-text">
                        <span className="hire-btn-small mono">Hire us on</span>
                        <span className="hire-btn-name">{p.name}</span>
                    </span>
                    <i className="ri-arrow-right-up-line hire-btn-arrow" aria-hidden="true"></i>
                </a>
            ))}
        </div>
    )
}

export default HireUs
