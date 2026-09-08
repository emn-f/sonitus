import React from 'react'
import type { NoiseLevel } from '../types'
import { levelLabels } from '../data/noiseData'
import { Volume2, Volume1, VolumeX } from 'lucide-react'

interface SoundBadgeProps {
  level: NoiseLevel
  decibels?: number
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const SoundBadge: React.FC<SoundBadgeProps> = ({
  level,
  decibels,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const Icon = level === 'tranquilo' ? Volume1 : level === 'moderado' ? Volume2 : Volume2

  return (
    <span
      className={`sound-badge ${level} size-${size} ${className}`}
      role="status"
      aria-label={`Classificação: ${levelLabels[level]}${decibels !== undefined ? ` (${decibels} decibéis)` : ''}`}
    >
      <span className={`status-dot ${level}`} aria-hidden="true" />
      {showIcon && <Icon className="badge-icon" size={size === 'sm' ? 12 : 14} aria-hidden="true" />}
      <span className="badge-text">{levelLabels[level]}</span>
      {decibels !== undefined && <span className="badge-db">{decibels} dB</span>}
    </span>
  )
}
