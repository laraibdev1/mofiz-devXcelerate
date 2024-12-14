import React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
}

export const Avatar: React.FC<AvatarProps> = ({ className, src, alt, ...props }) => {
  return (
    <div className={cn('relative w-10 h-10 rounded-full overflow-hidden', className)} {...props}>
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          {alt ? alt[0].toUpperCase() : 'U'}
        </div>
      )}
    </div>
  )
}

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img className="w-full h-full object-cover" {...props} />
}

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500" {...props}>
      {children}
    </div>
  )
}

