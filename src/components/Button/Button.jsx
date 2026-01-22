import './Button.css'

function Button({ children, href, variant = 'default', type = 'button', className = '', magnetic = false, ...props }) {
    const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : ''
    const classNames = `btn ${variantClass} ${magnetic ? 'btn-magnetic' : ''} ${className}`.trim()

    if (href) {
        return (
            <a href={href} className={classNames} {...props}>
                {children}
            </a>
        )
    }

    return (
        <button type={type} className={classNames} {...props}>
            {children}
        </button>
    )
}

export default Button
