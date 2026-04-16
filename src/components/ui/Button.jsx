/**
 * Button.jsx
 * Primary shared button component.
 * Variants: 'primary' (gold), 'secondary' (outline), 'danger' (earthy red).
 */
import React from 'react'

const variants = {
  primary: 'bg-gold text-forest hover:brightness-110 font-semibold',
  secondary: 'border border-gold text-gold hover:bg-gold/10',
  danger: 'bg-danger text-cream hover:brightness-110',
  ghost: 'text-cream hover:text-gold',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-md font-body text-sm
        transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gold/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] ?? variants.primary}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
