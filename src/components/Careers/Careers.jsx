import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CustomCursor from '../CustomCursor/CustomCursor'
import CookieBanner from '../CookieBanner/CookieBanner'
import Button from '../Button/Button'
import useSeo from '../../hooks/useSeo'
import './Careers.css'

const CAREERS_EMAIL = 'info@cleverproject.lk'
const SITE = 'https://www.cleverproject.lk'

const stats = [
    { value: '5+', label: 'Live products' },
    { value: 'Hybrid', label: 'Flexible work' },
    { value: '4', label: 'Step hiring process' },
    { value: '2 wks', label: 'Typical time to offer' },
]

const values = [
    { num: '01', title: 'Ship real products', desc: 'Your work goes live. AmigoTap, Mobile POS, Petty Cash, FixIt and Seettu Circle are used by real businesses every day.' },
    { num: '02', title: 'Own the outcome', desc: 'Small teams, clear ownership. You take features from idea to production and see the impact of what you build.' },
    { num: '03', title: 'Learn fast, together', desc: 'Code reviews, pairing and weekly tech talks. We use AI tooling daily and expect everyone to keep growing.' },
    { num: '04', title: 'Respect people’s time', desc: 'Honest estimates, focused work hours and no culture of late nights. Sustainable pace builds better software.' },
]

const perks = [
    { icon: 'ri-home-wifi-line', title: 'Hybrid & remote', desc: 'Work from home or the studio. We care about results, not desk hours.' },
    { icon: 'ri-money-dollar-circle-line', title: 'Competitive pay', desc: 'Market-aligned salaries with yearly performance reviews.' },
    { icon: 'ri-graduation-cap-line', title: 'Hands-on learning', desc: 'Learn on real client projects through code reviews, pairing and tech talks.' },
    { icon: 'ri-rocket-2-line', title: 'Clear growth path', desc: 'Defined career levels and mentorship from senior engineers.' },
]

const roles = [
    {
        id: 'senior-react-developer',
        title: 'Senior React Developer',
        team: 'Engineering',
        type: 'Full-time',
        location: 'Hybrid · Sri Lanka',
        experience: '4+ years',
        summary: 'Lead front-end development of our web products and client platforms using React, Vite and modern tooling.',
        responsibilities: [
            'Build fast, accessible and well-tested React interfaces',
            'Own front-end architecture decisions and code reviews',
            'Work closely with design to turn Figma into polished UI',
            'Mentor junior developers on the team',
        ],
        requirements: [
            '4+ years of professional React / JavaScript experience',
            'Strong grasp of performance, SEO and responsive design',
            'Experience with REST APIs and state management',
            'Good written and spoken English',
        ],
    },
    {
        id: 'flutter-mobile-developer',
        title: 'Flutter Mobile Developer',
        team: 'Engineering',
        type: 'Full-time',
        location: 'Hybrid · Sri Lanka',
        experience: '2+ years',
        summary: 'Build and ship cross-platform mobile apps for Android and iOS, including our Mobile POS and FixIt products.',
        responsibilities: [
            'Develop features across our Flutter mobile apps',
            'Integrate with backend APIs, payments and device hardware',
            'Publish and maintain apps on the Play Store and App Store',
            'Improve app performance and crash-free rates',
        ],
        requirements: [
            '2+ years building production apps with Flutter / Dart',
            'At least one published app on a public store',
            'Understanding of offline-first and local storage patterns',
            'Familiarity with Firebase is a plus',
        ],
    },
    {
        id: 'backend-engineer',
        title: 'Backend Engineer (Node.js)',
        team: 'Engineering',
        type: 'Full-time',
        location: 'Remote · Sri Lanka',
        experience: '3+ years',
        summary: 'Design and scale the APIs and data systems that power our POS, finance and marketplace products.',
        responsibilities: [
            'Design secure, well-documented REST APIs',
            'Model data and optimise database performance',
            'Set up CI/CD, monitoring and cloud infrastructure',
            'Collaborate with web and mobile teams on integrations',
        ],
        requirements: [
            '3+ years with Node.js (or similar) in production',
            'Solid SQL and/or MongoDB experience',
            'Experience deploying on AWS, GCP or Vercel',
            'Security-minded approach to auth and payments',
        ],
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        team: 'Design',
        type: 'Full-time',
        location: 'Hybrid · Sri Lanka',
        experience: '2+ years',
        summary: 'Shape how people experience our products, from research and flows to high-fidelity interfaces and design systems.',
        responsibilities: [
            'Run user research and turn insights into clear flows',
            'Design web and mobile interfaces in Figma',
            'Maintain and grow our shared design system',
            'Partner with developers through handoff and QA',
        ],
        requirements: [
            'A portfolio showing shipped product design work',
            'Strong visual, typography and interaction skills',
            'Comfort designing for both web and mobile',
            'Prototyping and motion skills are a plus',
        ],
    },
    {
        id: 'qa-engineer',
        title: 'QA Engineer',
        team: 'Quality',
        type: 'Full-time',
        location: 'Hybrid · Sri Lanka',
        experience: '1+ years',
        summary: 'Make sure every release is reliable by building test plans and automation across web and mobile.',
        responsibilities: [
            'Write and run test plans for new features',
            'Build automated tests for critical user flows',
            'Report, track and verify bugs with the team',
            'Help define our release quality checklist',
        ],
        requirements: [
            '1+ years in manual and/or automated testing',
            'Experience with tools like Playwright, Cypress or Appium',
            'Sharp attention to detail',
            'Clear communication when reporting issues',
        ],
    },
    {
        id: 'paid-software-engineering-internship',
        title: 'Software Engineering Intern (Paid)',
        team: 'Internship',
        type: 'Paid internship · 6 months',
        location: 'On-site · Sri Lanka',
        experience: 'Undergraduate / Graduate',
        summary: 'A paid internship for students who can already build. Join a live product team and ship code to production with a monthly allowance.',
        responsibilities: [
            'Build features alongside a mentor on a live product',
            'Take part in standups, code reviews and planning',
            'Write tests and documentation for your work',
            'Present what you built at the end of the internship',
        ],
        requirements: [
            'Studying or graduated in Computer Science, IT or a related field',
            'Working knowledge of JavaScript/React, Flutter or Node.js',
            'Projects you can show us (GitHub, portfolio or app)',
            'Able to commit full-time for 6 months',
        ],
    },
    {
        id: 'unpaid-internship',
        title: 'Training Internship (Unpaid)',
        team: 'Internship',
        type: 'Unpaid internship · 3–6 months',
        location: 'Hybrid · Sri Lanka',
        experience: 'Beginners welcome',
        summary: 'An unpaid, learning-focused internship for students who want real industry experience, mentorship and a certificate for their degree.',
        responsibilities: [
            'Learn our stack through guided tasks and mentoring',
            'Contribute to internal tools and real project work',
            'Join team meetings and code reviews',
            'Build a portfolio project by the end of the programme',
        ],
        requirements: [
            'Studying IT, Software Engineering, Design or a related field',
            'Basic programming or design knowledge',
            'Eagerness to learn and take feedback',
            'Internship letter / certificate provided on completion',
        ],
    },
    {
        id: 'sales-intern',
        title: 'Sales Intern (Commission-based)',
        team: 'Sales',
        type: 'Commission-based internship',
        location: 'Hybrid · Sri Lanka',
        experience: 'No experience needed',
        summary: 'Help businesses discover our POS systems, apps and software services. You earn commission on every client you bring in, with no limit on what you can make.',
        responsibilities: [
            'Make cold calls to introduce our products and services',
            'Manage sales calls, follow-ups and client meetings',
            'Find and research new clients and business leads',
            'Keep the lead list and sales pipeline up to date',
        ],
        requirements: [
            'Confident speaking on the phone and with business owners',
            'Good communication in English and Sinhala (Tamil is a plus)',
            'Self-motivated and target-driven',
            'Interest in technology and sales; students welcome',
        ],
    },
]

const steps = [
    { num: '01', title: 'Apply', desc: 'Send your CV and portfolio or GitHub. We read every application.', time: '5 min' },
    { num: '02', title: 'Intro call', desc: 'A relaxed 30-minute chat about you, the role and how we work.', time: '30 min' },
    { num: '03', title: 'Skills session', desc: 'A practical task or live session based on real work, never trick questions.', time: '1–2 hrs' },
    { num: '04', title: 'Offer', desc: 'Meet the team, ask anything, and get a clear written offer.', time: '1 week' },
]

const faqs = [
    { q: 'Do you hire people without a degree?', a: 'Yes. We care about what you can build. A strong portfolio, GitHub or shipped project counts as much as a qualification.' },
    { q: 'Can I apply if no open role fits me?', a: 'Absolutely. Send a general application and tell us what you are great at. We keep strong profiles on file and reach out when a fit opens up.' },
    { q: 'How long does the hiring process take?', a: 'Most candidates go from application to offer in about two weeks. We reply to every application, even if it is a no.' },
    { q: 'Are your internships paid?', a: 'We offer three types. Our paid software internship includes a monthly allowance and is for students who can already build. Our unpaid training internship is focused on learning and mentorship, with a certificate on completion. Our sales internship is commission-based: you earn commission on every client you bring in.' },
    { q: 'Do you offer remote work?', a: 'Most roles are hybrid or fully remote within Sri Lanka. Each listing shows its work arrangement.' },
]

const teams = ['All', ...new Set(roles.map(r => r.team))]

// Applications are delivered to CAREERS_EMAIL by FormSubmit (formsubmit.co), which
// supports CV attachments without a server. The first submission sends a one-time
// confirmation email to CAREERS_EMAIL that must be accepted before applications arrive.
const FORM_ENDPOINT = `https://formsubmit.co/${CAREERS_EMAIL}`
const GENERAL_APPLICATION = 'General Application'
const MAX_CV_BYTES = 10 * 1024 * 1024
const CV_EXTENSIONS = ['pdf', 'doc', 'docx']

const careersSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        ...roles.map(role => ({
            '@type': 'JobPosting',
            title: role.title,
            description: `<p>${role.summary}</p><ul>${role.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>`,
            datePosted: '2026-11-24',
            employmentType: /internship/i.test(role.type) ? 'INTERN' : 'FULL_TIME',
            hiringOrganization: { '@type': 'Organization', name: 'Clever Project', sameAs: SITE, logo: `${SITE}/logo-512.png` },
            jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'LK' } },
            ...(role.location.startsWith('Remote') && {
                jobLocationType: 'TELECOMMUTE',
                applicantLocationRequirements: { '@type': 'Country', name: 'Sri Lanka' },
            }),
            directApply: true,
            url: `${SITE}/careers/${role.id}`,
        })),
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                { '@type': 'ListItem', position: 2, name: 'Careers', item: `${SITE}/careers` },
            ],
        },
    ],
}

function roleUrl(role) {
    // The current origin, so links work on the live site and in local previews alike
    return `${window.location.origin}/careers/${role.id}`
}

function ShareRole({ role }) {
    const [copied, setCopied] = useState(false)
    const url = roleUrl(role)
    const text = `We're hiring: ${role.title} at Clever Project`

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url)
        } catch {
            // Clipboard API unavailable (e.g. insecure context): fall back to a hidden textarea
            const ta = document.createElement('textarea')
            ta.value = url
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            ta.remove()
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const targets = [
        { name: 'LinkedIn', icon: 'ri-linkedin-fill', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
        { name: 'Facebook', icon: 'ri-facebook-fill', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
        { name: 'WhatsApp', icon: 'ri-whatsapp-line', href: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}` },
    ]

    return (
        <div className="careers-share">
            <button type="button" className={`careers-share-copy mono ${copied ? 'is-copied' : ''}`} onClick={copyLink}>
                <i className={copied ? 'ri-check-line' : 'ri-link'} aria-hidden="true"></i>
                {copied ? 'Link copied' : 'Copy job link'}
            </button>
            {targets.map(t => (
                <a
                    key={t.name}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="careers-share-icon"
                    aria-label={`Share this job on ${t.name}`}
                    title={`Share on ${t.name}`}
                >
                    <i className={t.icon} aria-hidden="true"></i>
                </a>
            ))}
        </div>
    )
}

function RoleCard({ role, open, onToggle, onApply }) {
    return (
        <article id={role.id} className={`careers-role ${open ? 'is-open' : ''}`}>
            <button
                type="button"
                className="careers-role-head"
                aria-expanded={open}
                aria-controls={`${role.id}-details`}
                onClick={onToggle}
            >
                <div className="careers-role-main">
                    <span className="careers-role-team mono">{role.team}</span>
                    <h3 className="careers-role-title">{role.title}</h3>
                    <p className="careers-role-summary">{role.summary}</p>
                </div>
                <div className="careers-role-meta">
                    <span className="careers-chip mono"><i className="ri-time-line" aria-hidden="true"></i>{role.type}</span>
                    <span className="careers-chip mono"><i className="ri-map-pin-line" aria-hidden="true"></i>{role.location}</span>
                    <span className="careers-chip mono"><i className="ri-medal-line" aria-hidden="true"></i>{role.experience}</span>
                </div>
                <span className="careers-role-toggle" aria-hidden="true"><i className="ri-add-line"></i></span>
            </button>

            <div className="careers-role-body" id={`${role.id}-details`} hidden={!open}>
                <div className="careers-role-cols">
                    <div>
                        <h4 className="careers-role-subtitle mono">What you’ll do</h4>
                        <ul className="careers-list">
                            {role.responsibilities.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="careers-role-subtitle mono">What we’re looking for</h4>
                        <ul className="careers-list">
                            {role.requirements.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="careers-role-actions">
                    <Button href="#apply" variant="primary" onClick={() => onApply(role.title)}>
                        Apply for this role <i className="ri-arrow-right-line" aria-hidden="true"></i>
                    </Button>
                    <span className="careers-role-note mono">Upload your CV · we reply within 5 working days</span>
                    <ShareRole role={role} />
                </div>
            </div>
        </article>
    )
}

function formatSize(bytes) {
    return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function ApplicationForm({ position, onPositionChange }) {
    const [file, setFile] = useState(null)
    const [fileError, setFileError] = useState('')
    const [dragging, setDragging] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [name, setName] = useState('')
    const fileInputRef = useRef(null)
    // FormSubmit sends people back here with ?applied=1 once the application is delivered
    const [submitted] = useState(() => new URLSearchParams(window.location.search).has('applied'))

    const returnUrl = `${window.location.origin}/careers?applied=1#apply`

    function pickFile(picked) {
        if (!picked) return
        const ext = picked.name.split('.').pop().toLowerCase()
        if (!CV_EXTENSIONS.includes(ext)) {
            setFileError('Please upload your CV as a PDF or Word document (.pdf, .doc, .docx).')
        } else if (picked.size > MAX_CV_BYTES) {
            setFileError(`That file is ${formatSize(picked.size)}. The maximum size is 10 MB.`)
        } else {
            setFileError('')
            setFile(picked)
            // Keep the real file input in sync when a file is dropped onto the zone
            if (fileInputRef.current && fileInputRef.current.files[0] !== picked) {
                const dt = new DataTransfer()
                dt.items.add(picked)
                fileInputRef.current.files = dt.files
            }
            return
        }
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    function clearFile() {
        setFile(null)
        setFileError('')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    function handleSubmit(e) {
        if (!file) {
            e.preventDefault()
            setFileError('Please attach your CV before submitting.')
            fileInputRef.current?.closest('.careers-upload')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            return
        }
        setSubmitting(true)
    }

    return (
        <section className="careers-section careers-apply-section" id="apply">
            <div className="container careers-container careers-apply-wrap">
                <div className="careers-apply-intro reveal">
                    <span className="careers-label mono">Apply now</span>
                    <h2 className="careers-section-title">Send us<br /><span className="text-muted">your application</span></h2>
                    <p className="careers-apply-text">
                        Fill in your details and upload your CV. Your application goes straight to our hiring team,
                        and we reply to every applicant within 5 working days.
                    </p>
                    <ul className="careers-apply-points">
                        <li><i className="ri-file-upload-line" aria-hidden="true"></i>PDF or Word CV, up to 10 MB</li>
                        <li><i className="ri-shield-check-line" aria-hidden="true"></i>Used only for recruitment</li>
                        <li><i className="ri-time-line" aria-hidden="true"></i>Takes about 3 minutes</li>
                    </ul>
                </div>

                <div className="careers-apply-card reveal reveal-delay-1">
                    {submitted ? (
                        <div className="careers-apply-success" role="status">
                            <span className="careers-apply-success-icon"><i className="ri-check-line" aria-hidden="true"></i></span>
                            <h3>Application received</h3>
                            <p>Thank you for applying to Clever Project. Our team will review your CV and get back to you within 5 working days.</p>
                            <Button href="/careers#open-roles">Back to open roles</Button>
                        </div>
                    ) : (
                        <form
                            className="careers-form"
                            action={FORM_ENDPOINT}
                            method="POST"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            {/* FormSubmit settings */}
                            <input type="hidden" name="_subject" value={`New job application: ${position}${name ? ` from ${name}` : ''}`} />
                            <input type="hidden" name="_next" value={returnUrl} />
                            <input type="hidden" name="_template" value="table" />
                            <input type="text" name="_honey" className="careers-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                            <div className="careers-field careers-field--full">
                                <label htmlFor="apply-position">Position</label>
                                <select
                                    id="apply-position"
                                    name="Position"
                                    value={position}
                                    onChange={e => onPositionChange(e.target.value)}
                                    required
                                >
                                    {roles.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
                                    <option value={GENERAL_APPLICATION}>{GENERAL_APPLICATION}</option>
                                </select>
                            </div>

                            <div className="careers-field">
                                <label htmlFor="apply-name">Full name</label>
                                <input id="apply-name" name="Name" type="text" autoComplete="name" required
                                    value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
                            </div>
                            <div className="careers-field">
                                <label htmlFor="apply-email">Email</label>
                                <input id="apply-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                            </div>
                            <div className="careers-field">
                                <label htmlFor="apply-phone">Phone / WhatsApp</label>
                                <input id="apply-phone" name="Phone" type="tel" autoComplete="tel" required placeholder="+94 7X XXX XXXX" />
                            </div>
                            <div className="careers-field">
                                <label htmlFor="apply-link">Portfolio, GitHub or LinkedIn <span>(optional)</span></label>
                                <input id="apply-link" name="Portfolio" type="url" placeholder="https://" />
                            </div>

                            <div className="careers-field careers-field--full">
                                <span className="careers-field-label" id="apply-cv-label">CV / Resume</span>
                                <label
                                    className={`careers-upload ${dragging ? 'is-dragging' : ''} ${file ? 'has-file' : ''} ${fileError ? 'has-error' : ''}`}
                                    onDragOver={e => { e.preventDefault(); setDragging(true) }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={e => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]) }}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="CV"
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        aria-labelledby="apply-cv-label"
                                        aria-describedby="apply-cv-help"
                                        onChange={e => pickFile(e.target.files[0])}
                                    />
                                    {file ? (
                                        <span className="careers-upload-file">
                                            <i className="ri-file-text-line" aria-hidden="true"></i>
                                            <span>
                                                <strong>{file.name}</strong>
                                                <small className="mono">{formatSize(file.size)} · click to change</small>
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="careers-upload-empty">
                                            <i className="ri-upload-cloud-2-line" aria-hidden="true"></i>
                                            <strong>Drop your CV here or <u>browse</u></strong>
                                            <small className="mono" id="apply-cv-help">PDF, DOC or DOCX · max 10 MB</small>
                                        </span>
                                    )}
                                </label>
                                {file && (
                                    <button type="button" className="careers-upload-remove mono" onClick={clearFile}>
                                        <i className="ri-close-line" aria-hidden="true"></i> Remove file
                                    </button>
                                )}
                                {fileError && <p className="careers-field-error" role="alert">{fileError}</p>}
                            </div>

                            <div className="careers-field careers-field--full">
                                <label htmlFor="apply-message">Why do you want to join us? <span>(optional)</span></label>
                                <textarea id="apply-message" name="Message" rows={4} placeholder="Tell us a little about yourself and what you’d like to work on." />
                            </div>

                            <label className="careers-consent careers-field--full">
                                <input type="checkbox" name="Consent" value="Agreed to be contacted about this application" required />
                                <span>I agree to Clever Project storing my details and CV to review this application.</span>
                            </label>

                            <div className="careers-form-actions careers-field--full">
                                <Button type="submit" variant="primary" disabled={submitting}>
                                    {submitting ? 'Sending…' : 'Submit application'}
                                    <i className={submitting ? 'ri-loader-4-line careers-spin' : 'ri-send-plane-line'} aria-hidden="true"></i>
                                </Button>
                                <span className="careers-role-note mono">You may be asked to tick a quick “I’m not a robot” check.</span>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}

export default function Careers() {
    // A job's own link is /careers/<role-id>; older /careers#<role-id> links still work
    const { roleId } = useParams()
    const linkedRole = roles.find(r => r.id === (roleId || window.location.hash.slice(1)))

    useSeo({
        title: linkedRole
            ? `${linkedRole.title} | Careers at Clever Project`
            : 'Careers at Clever Project | Software Jobs in Sri Lanka',
        description: linkedRole
            ? `${linkedRole.summary} ${linkedRole.type}, ${linkedRole.location}. Apply online with your CV.`
            : 'Join Clever Project, a Sri Lankan software studio. Open roles in React, Flutter, backend, UI/UX design, QA, sales and paid or unpaid internships.',
        path: linkedRole ? `/careers/${linkedRole.id}` : '/careers',
        jsonLd: careersSchema,
    })

    const [team, setTeam] = useState('All')
    // Open the linked job, otherwise the first one
    const [openRole, setOpenRole] = useState(() => (linkedRole ?? roles[0]).id)
    const [openFaq, setOpenFaq] = useState(0)
    const [position, setPosition] = useState(() => linkedRole?.title ?? GENERAL_APPLICATION)
    const pageRef = useRef(null)

    const visibleRoles = useMemo(
        () => (team === 'All' ? roles : roles.filter(r => r.team === team)),
        [team]
    )

    useEffect(() => {
        const hash = window.location.hash.slice(1)
        const target = hash === 'apply' ? 'apply' : linkedRole?.id
        if (target) {
            requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: target === 'apply' ? 'start' : 'center' }))
        }
        // Only on first load; linkedRole comes from the URL the page was opened with
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )
        pageRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [visibleRoles])

    return (
        <div className="careers-page" ref={pageRef}>
            <CustomCursor />
            <Header />

            <main>
                {/* Hero */}
                <section className="careers-hero">
                    <div className="careers-hero-glow" aria-hidden="true"></div>
                    <div className="container careers-container">
                        <span className="careers-eyebrow mono reveal">
                            <span className="careers-eyebrow-line"></span>
                            Careers · We’re hiring
                        </span>
                        <h1 className="careers-hero-title reveal reveal-delay-1">
                            Build software that<br />
                            <span className="careers-accent">businesses run on.</span>
                        </h1>
                        <p className="careers-hero-sub reveal reveal-delay-2">
                            We’re a Sri Lankan software studio crafting POS systems, fintech and mobile products used every day.
                            Join a small, senior-minded team where your work ships and matters.
                        </p>
                        <div className="careers-hero-cta reveal reveal-delay-3">
                            <Button href="#open-roles" variant="primary">
                                View open roles <i className="ri-arrow-down-line" aria-hidden="true"></i>
                            </Button>
                            <Button href="#apply">Apply now</Button>
                        </div>

                        <dl className="careers-stats reveal reveal-delay-4">
                            {stats.map(s => (
                                <div key={s.label} className="careers-stat">
                                    <dt className="careers-stat-label mono">{s.label}</dt>
                                    <dd className="careers-stat-value">{s.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Values */}
                <section className="careers-section">
                    <div className="container careers-container">
                        <div className="careers-section-head reveal">
                            <span className="careers-label mono">How we work</span>
                            <h2 className="careers-section-title">What it’s like<br /><span className="text-muted">to work here</span></h2>
                        </div>
                        <div className="careers-values">
                            {values.map((v, i) => (
                                <div key={v.num} className={`careers-value reveal reveal-delay-${i + 1}`}>
                                    <span className="careers-value-num mono">{v.num}</span>
                                    <h3 className="careers-value-title">{v.title}</h3>
                                    <p className="careers-value-desc">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Perks */}
                <section className="careers-section careers-section--surface">
                    <div className="container careers-container">
                        <div className="careers-section-head reveal">
                            <span className="careers-label mono">Benefits</span>
                            <h2 className="careers-section-title">We take care<br /><span className="text-muted">of our people</span></h2>
                        </div>
                        <div className="careers-perks">
                            {perks.map((p, i) => (
                                <div key={p.title} className={`careers-perk reveal reveal-delay-${(i % 3) + 1}`}>
                                    <span className="careers-perk-icon"><i className={p.icon} aria-hidden="true"></i></span>
                                    <h3 className="careers-perk-title">{p.title}</h3>
                                    <p className="careers-perk-desc">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open roles */}
                <section className="careers-section" id="open-roles">
                    <div className="container careers-container">
                        <div className="careers-roles-head reveal">
                            <div>
                                <span className="careers-label mono">Open positions</span>
                                <h2 className="careers-section-title">Find your<br /><span className="text-muted">next role</span></h2>
                            </div>
                            <div className="careers-filters" role="group" aria-label="Filter roles by team">
                                {teams.map(t => {
                                    const count = t === 'All' ? roles.length : roles.filter(r => r.team === t).length
                                    return (
                                        <button
                                            key={t}
                                            type="button"
                                            className={`careers-filter mono ${team === t ? 'active' : ''}`}
                                            aria-pressed={team === t}
                                            onClick={() => setTeam(t)}
                                        >
                                            {t} <span className="careers-filter-count">{count}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="careers-roles">
                            {visibleRoles.map(role => (
                                <RoleCard
                                    key={role.id}
                                    role={role}
                                    open={openRole === role.id}
                                    onToggle={() => setOpenRole(openRole === role.id ? null : role.id)}
                                    onApply={setPosition}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="careers-section careers-section--surface" id="process">
                    <div className="container careers-container">
                        <div className="careers-section-head reveal">
                            <span className="careers-label mono">Hiring process</span>
                            <h2 className="careers-section-title">Simple, fast<br /><span className="text-muted">and respectful</span></h2>
                        </div>
                        <ol className="careers-steps">
                            {steps.map((s, i) => (
                                <li key={s.num} className={`careers-step reveal reveal-delay-${i + 1}`}>
                                    <div className="careers-step-top">
                                        <span className="careers-step-num mono">{s.num}</span>
                                        <span className="careers-step-time mono">{s.time}</span>
                                    </div>
                                    <h3 className="careers-step-title">{s.title}</h3>
                                    <p className="careers-step-desc">{s.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Application form */}
                <ApplicationForm position={position} onPositionChange={setPosition} />

                {/* FAQ */}
                <section className="careers-section">
                    <div className="container careers-container careers-faq-wrap">
                        <div className="careers-section-head reveal">
                            <span className="careers-label mono">FAQ</span>
                            <h2 className="careers-section-title">Questions<br /><span className="text-muted">answered</span></h2>
                        </div>
                        <div className="careers-faqs reveal reveal-delay-1">
                            {faqs.map((f, i) => (
                                <div key={f.q} className={`careers-faq ${openFaq === i ? 'is-open' : ''}`}>
                                    <button
                                        type="button"
                                        className="careers-faq-q"
                                        aria-expanded={openFaq === i}
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    >
                                        {f.q}
                                        <i className="ri-add-line" aria-hidden="true"></i>
                                    </button>
                                    <p className="careers-faq-a" hidden={openFaq !== i}>{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* General application CTA */}
                <section className="careers-cta-section">
                    <div className="container careers-container">
                        <div className="careers-cta reveal">
                            <span className="careers-label mono">Don’t see your role?</span>
                            <h2 className="careers-cta-title">Talented people are<br /><span className="careers-accent">always welcome.</span></h2>
                            <p className="careers-cta-sub">
                                Send us your CV and tell us how you’d like to contribute. We’ll keep you in mind for future openings.
                            </p>
                            <div className="careers-hero-cta">
                                <Button href="#apply" variant="primary" onClick={() => setPosition(GENERAL_APPLICATION)}>
                                    Send general application <i className="ri-arrow-right-line" aria-hidden="true"></i>
                                </Button>
                                <Button href="https://www.linkedin.com/company/cleverprojects/" target="_blank" rel="noopener noreferrer">
                                    Follow on LinkedIn <i className="ri-linkedin-box-line" aria-hidden="true"></i>
                                </Button>
                            </div>
                            <p className="careers-cta-mail mono">or email <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a></p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieBanner />
        </div>
    )
}
