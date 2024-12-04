'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ModernHeader from '@/app/components/Header';
import { CourseCard } from '@/app/components/CourseCard';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Slider } from "@/app/components/ui/slider";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
import { ArrowRight, ChevronDown, Code, Cpu, Globe, Layers, Lightbulb, Mail, MessageSquare, Moon, Rocket, Sun, Zap, BookOpen, Users, Award, Clock, Shield, Search } from 'lucide-react';
import { FloatingSticker } from '@/app/components/FloatingSticker';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="flex flex-col items-center text-center p-6 h-full">
    <Icon className="w-12 h-12 mb-4 text-primary" />
    <CardHeader className="p-0">
      <CardTitle className="text-xl mb-2">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ name, role, content, avatar }: { name: string, role: string, content: string, avatar: string }) => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground">{content}</p>
    </CardContent>
  </Card>
);

const PricingCard = ({ title, price, features, recommended }: { title: string, price: string, features: string[], recommended?: boolean }) => (
  <Card className={`flex flex-col ${recommended ? 'border-primary' : ''}`}>
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription>
        <span className="text-3xl font-bold">{price}</span> / month
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={recommended ? "default" : "outline"}>
        Get Started
      </Button>
    </CardFooter>
  </Card>
);

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  url: string;
  imageUrl: string;
}

const categories = [
  "All",
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Mobile Development",
  "DevOps",
  "Cybersecurity",
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Simulating API call to fetch courses
    setIsLoading(true);
    setTimeout(() => {
      const mockCourses: Course[] = Array.from({ length: 6 }, (_, i) => ({
        id: `course-${i + 1}`,
        title: `Course ${i + 1}: Advanced ${categories[i % (categories.length - 1) + 1]}`,
        description: `This is a comprehensive course on ${categories[i % (categories.length - 1) + 1]}.`,
        category: categories[i % (categories.length - 1) + 1],
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 1000),
        url: 'http://localhost:4000/api/courses/api',
        imageUrl: `/placeholder.svg?height=200&width=400&text=Course+${i + 1}`
      }));
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredCourses = courses.filter(course => 
    (selectedCategory === "All" || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50" style={{ scaleX }} />
      <ModernHeader />
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground opacity-90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold text-slate-200 mb-8 "
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Advance Your Engineering Career with DevXcelerate
                </motion.h1>
                <motion.p 
                  className="text-2xl text-slate-400 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Master cutting-edge technologies and skills with our expert-led courses
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col items-start space-y-4"
                >
                  <div className="flex items-center w-full max-w-md">
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-grow mr-2"
                    />
                    <Button size="lg" variant="secondary">
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </div>
                  <Button size="lg" variant="default">
                    Explore Courses
                  </Button>
                </motion.div>
              </div>
              <div className="w- md:w-1/2 relative  ">
                <motion.img
                  src="/developer.png"
                  alt="Hero Image"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                <motion.div
                  className="absolute -top-10 -left-10 bg-secondary text-secondary-foreground p-4 rounded-full shadow-lg"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* <span className="text-2xl font-bold">New!</span> */}
                </motion.div>
                <motion.div
                  className="absolute -bottom-5 -right-5 bg-accent text-accent-foreground p-3 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {/* <span className="text-lg font-semibold">50+ Courses</span> */}
                </motion.div>
              </div>
            </div>
          </div>
          <FloatingSticker text="Hot Courses!" className="top-10 left-10" />
          <FloatingSticker text="Learn Now" className="bottom-10 right-10" />
          <FloatingSticker text="Expert Instructors" className="top-1/2 right-10 transform -translate-y-1/2" />
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-t-lg"></div>
                    <div className="bg-white p-4 rounded-b-lg">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Courses
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Choose DevXcelerate?</h2>
              <p className="text-lg mb-8">
                DevXcelerate offers cutting-edge courses designed specifically for engineers, 
                taught by industry experts and leading academics. Our platform provides:
              </p>
              <ul className="text-left list-disc list-inside mb-8">
                <li>Hands-on projects and real-world applications</li>
                <li>Flexible learning schedules to fit your busy life</li>
                <li>Certificates recognized by top engineering firms</li>
                <li>A supportive community of fellow engineers</li>
              </ul>
              {/* <Button size="lg">Start Learning Today</Button> */}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={Rocket}
                  title="Accelerated Learning"
                  description="Our courses are designed for rapid skill acquisition, helping you stay ahead in the fast-paced tech industry."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={Users}
                  title="Expert Instructors"
                  description="Learn from industry professionals and academics with years of experience in their respective fields."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={Cpu}
                  title="Cutting-edge Curriculum"
                  description="Stay updated with the latest technologies and methodologies in software engineering and computer science."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={Code}
                  title="Hands-on Projects"
                  description="Apply your learning to real-world projects, building a portfolio that showcases your skills to potential employers."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={Clock}
                  title="Flexible Learning"
                  description="Learn at your own pace with our on-demand video lectures and flexible course schedules."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={Award}
                  title="Industry-recognized Certificates"
                  description="Earn certificates that are valued by top tech companies, boosting your career prospects."
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name="Mofiz"
                  role="Software Engineer"
                  content="DevXcelerate's courses helped me transition from a junior to a senior developer role. The practical projects and expert guidance were invaluable."
                  avatar="/https://i.ytimg.com/vi/ZATtuxTGrN4/maxresdefault.jpg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name="Michael Chen"
                  role="Data Scientist"
                  content="The machine learning course on DevXcelerate was exactly what I needed to break into the field of AI. The instructors are top-notch!"
                  avatar="/placeholder.svg?height=100&width=100"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name="Emily Rodriguez"
                  role="Full Stack Developer"
                  content="I love how DevXcelerate keeps updating their curriculum. I've taken multiple courses, and each one has directly impacted my work."
                  avatar="/placeholder.svg?height=100&width=100"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Flexible Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <PricingCard
                  title="Basic"
                  price="$29.99"
                  features={[
                    "Access to 5 courses",
                    "Basic project assessments",
                    "Community forum access",
                    "Email support"
                  ]}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <PricingCard
                  title="Pro"
                  price="$59.99"
                  features={[
                    "Access to all courses",
                    "Advanced project assessments",
                    "Live Q&A sessions",
                    "Priority email support",
                    "Job placement assistance"
                  ]}
                  recommended
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <PricingCard
                  title="Enterprise"
                  price="Custom"
                  features={[
                    "Custom course packages",
                    "Dedicated account manager",
                    "On-site training options",
                    "24/7 priority support",
                    "Custom integrations",
                    "Team collaboration tools"
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Accelerate Your Career?</h2>
              <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of engineers who have transformed their careers with DevXcelerate.
              </p>
              <Button size="lg" variant="secondary" className="mt-4">
                Get Started Now
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Get in Touch</h2>
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Have questions? We're here to help. Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="john.doe@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea className="min-h-[100px]" id="message" placeholder="How can we help you?" />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Send Message</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Courses</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Web Development</a></li>
                <li><a href="#" className="hover:underline">Data Science</a></li>
                <li><a href="#" className="hover:underline">Machine Learning</a></li>
                <li><a href="#" className="hover:underline">Cloud Computing</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Partners</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">Tutorials</a></li>
                <li><a href="#" className="hover:underline">Webinars</a></li>
                <li><a href="#" className="hover:underline">Open Source</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
                <li><a href="#" className="hover:underline">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevXcelerate. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

