'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ModernHeader from '../components/Header'
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from '../components/ui/button'
import { Badge } from "@/app/components/ui/badge"
import { Switch } from "@/app/components/ui/switch"
import { BookOpen, Video, Award, Bell, Mail, Lock, User, Zap } from 'lucide-react'

const MotionCard = motion(Card)

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [highlightedStat, setHighlightedStat] = useState<string | null>(null)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const statVariants = {
    normal: { scale: 1 },
    highlighted: { scale: 1.1, transition: { yoyo: Infinity, duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-primary"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Profile
        </motion.h1>
        <div className="grid gap-8 md:grid-cols-3">
          <MotionCard className="col-span-1" variants={cardVariants} initial="hidden" animate="visible">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/avatars/01.png" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>@johndoe</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                  <Mail className="text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </motion.div>
                <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                  <Lock className="text-muted-foreground" />
                  <span>Account created on Jan 1, 2023</span>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                <Button className="w-full">Edit Profile</Button>
              </motion.div>
            </CardFooter>
          </MotionCard>
          <MotionCard className="col-span-2" variants={cardVariants} initial="hidden" animate="visible">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 text-yellow-500" />
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer"
                  variants={statVariants}
                  animate={highlightedStat === 'courses' ? 'highlighted' : 'normal'}
                  onMouseEnter={() => setHighlightedStat('courses')}
                  onMouseLeave={() => setHighlightedStat(null)}
                >
                  <BookOpen className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Courses Started</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer"
                  variants={statVariants}
                  animate={highlightedStat === 'videos' ? 'highlighted' : 'normal'}
                  onMouseEnter={() => setHighlightedStat('videos')}
                  onMouseLeave={() => setHighlightedStat(null)}
                >
                  <Video className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold">126</p>
                    <p className="text-sm text-muted-foreground">Videos Watched</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer"
                  variants={statVariants}
                  animate={highlightedStat === 'certificates' ? 'highlighted' : 'normal'}
                  onMouseEnter={() => setHighlightedStat('certificates')}
                  onMouseLeave={() => setHighlightedStat(null)}
                >
                  <Award className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Certificates Earned</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </MotionCard>
        </div>
        <Tabs defaultValue="account" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-4">
            <MotionCard variants={cardVariants} initial="hidden" animate="visible">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button>Save Changes</Button>
                </motion.div>
              </CardFooter>
            </MotionCard>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <MotionCard variants={cardVariants} initial="hidden" animate="visible">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage your notification settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", transition: { duration: 0.2 } }}
                  style={{ padding: "10px", borderRadius: "8px" }}
                >
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications about your activity.</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", transition: { duration: 0.2 } }}
                  style={{ padding: "10px", borderRadius: "8px" }}
                >
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new courses and offers.</p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={marketing}
                    onCheckedChange={setMarketing}
                  />
                </motion.div>
              </CardContent>
            </MotionCard>
          </TabsContent>
        </Tabs>
      </motion.main>
    </div>
  )
}

