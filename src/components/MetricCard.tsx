import React from 'react'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  description: string
  badge?: {
    text: string
    variant?: 'calm' | 'moderate' | 'intense' | 'neutral' | 'primary'
  }
  icon?: React.ReactNode
  variant?: 'default' | 'highlight'
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  description,
  badge,
  icon,
  variant = 'default',
}) => {
  return (
    <article className={`metric-card ${variant}`}>
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        {icon && <div className="metric-icon" aria-hidden="true">{icon}</div>}
      </div>
      <div className="metric-body">
        <div className="metric-value-row">
          <strong className="metric-value">{value}</strong>
          {unit && <span className="metric-unit">{unit}</span>}
          {badge && (
            <span className={`metric-badge badge-${badge.variant || 'neutral'}`}>
              {badge.text}
            </span>
          )}
        </div>
        <p className="metric-description">{description}</p>
      </div>
    </article>
  )
}
