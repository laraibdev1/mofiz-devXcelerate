'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Eye, ThumbsUp, ExternalLink, BookOpen, Search, SortAsc, SortDesc } from 'lucide-react'

interface Video {
  url: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  category: string;
}

const categories = ['All', 'Basics', 'Advanced', 'Data Science', 'Web Development'];

export default function YouTubeVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:8080/api/courses/api')
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.videos.map((video: Video) => ({
          ...video,
          category: categories[Math.floor(Math.random() * categories.length)]
        })));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredAndSortedVideos = useMemo(() => {
    return videos
      .filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || video.category === selectedCategory)
      )
      .sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        return (a[sortBy as keyof Video] as number) > (b[sortBy as keyof Video] as number) ? order : -order;
      });
  }, [videos, searchTerm, selectedCategory, sortBy, sortOrder]);

  const getYouTubeVideoId = (url: string) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get('v');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BookOpen className="inline-block mr-2 mb-1 text-blue-600" />
          Api Tutorial
        </motion.h1>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Label htmlFor="search" className="sr-only">Search

              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-40">
                <Label htmlFor="category" className="sr-only">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label htmlFor="sort" className="sr-only">Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="likes">Likes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="grid" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="grid" className="mt-4">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <motion.div key={index} variants={cardVariants}>
                        <Card className="overflow-hidden shadow-md">
                          <CardHeader className="p-0">
                            <Skeleton className="h-48 w-full" />
                          </CardHeader>
                          <CardContent className="p-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  : filteredAndSortedVideos.map((video, index) => (
                      <motion.div key={index} variants={cardVariants} whileHover="hover">
                        <Card className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                          <CardHeader className="p-0">
                            <div className="relative pb-[56.25%] h-0 bg-gray-100">
                              <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.url)}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                              ></iframe>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow p-6">
                            <Badge className="mb-2 bg-blue-100 text-blue-800">{video.category}</Badge>
                            <CardTitle className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-300">
                              {video.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                              {video.description || 'No description available'}
                            </p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-800">
                                <Eye className="w-3 h-3" />
                                {formatNumber(video.views)}
                              </Badge>
                              <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-800">
                                <ThumbsUp className="w-3 h-3" />
                                {formatNumber(video.likes)}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="p-6 pt-0">
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                              <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                Watch Video
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="list" className="mt-4">
              <motion.div 
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <motion.div key={index} variants={cardVariants}>
                        <Card className="overflow-hidden shadow-md">
                          <div className="flex items-center p-4">
                            <Skeleton className="h-24 w-40 mr-4" />
                            <div className="flex-grow">
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-full mb-2" />
                              <Skeleton className="h-4 w-2/3" />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  : filteredAndSortedVideos.map((video, index) => (
                      <motion.div key={index} variants={cardVariants} whileHover="hover">
                        <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                          <div className="flex flex-col md:flex-row items-start p-4">
                            <div className="w-full md:w-40 mb-4 md:mb-0 md:mr-4">
                              <div className="relative pb-[56.25%] h-0 bg-gray-100">
                                <iframe
                                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.url)}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                              </div>
                            </div>
                            <div className="flex-grow">
                              <Badge className="mb-2 bg-blue-100 text-blue-800">{video.category}</Badge>
                              <CardTitle className="text-lg font-bold mb-2 text-gray-800">
                                {video.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {video.description || 'No description available'}
                              </p>
                              <div className="flex justify-between items-center mb-2">
                                <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-800">
                                  <Eye className="w-3 h-3" />
                                  {formatNumber(video.views)}
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-800">
                                  <ThumbsUp className="w-3 h-3" />
                                  {formatNumber(video.likes)}
                                </Badge>
                              </div>
                              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                  Watch Video
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}

