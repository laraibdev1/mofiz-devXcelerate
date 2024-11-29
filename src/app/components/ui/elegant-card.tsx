'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Icons } from "./ui/icons"

interface ElegantCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  likes: number
  onLike: () => void
}

export function ElegantCard({ title, description, imageUrl, tags, likes, onLike }: ElegantCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card 
        className="overflow-hidden backdrop-blur-xl bg-white/80 border-t border-l border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardTitle className="absolute bottom-4 left-4 text-2xl font-bold text-white">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardDescription className="text-gray-600 mb-4">{description}</CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            onClick={onLike}
          >
            <Icons.Heart className={`w-5 h-5 ${likes > 0 ? 'text-red-500 fill-red-500' : ''}`} />
            <span>{likes}</span>
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

