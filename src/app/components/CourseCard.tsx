'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Eye, ThumbsUp, ExternalLink } from 'lucide-react'

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  url: string;
  imageUrl: string;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
};

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  category,
  views,
  likes,
  url,
  imageUrl
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <motion.div variants={cardVariants} whileHover="hover">
      <Card className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative pb-[56.25%] h-0 bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <Badge className="mb-2 bg-primary/10 text-primary">{category}</Badge>
          <CardTitle className="text-xl font-bold mb-3 text-foreground line-clamp-2 hover:line-clamp-none transition-all duration-300">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
            {description || 'No description available'}
          </p>
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(views)}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {formatNumber(likes)}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full">
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              View Course
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

