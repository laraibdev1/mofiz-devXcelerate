"use client";

import { useState, useEffect, ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Book, ChevronDown, LogOut, Menu, Search, Settings, User } from 'lucide-react';

const courseCategories = [
  {
    name: "Web Development",
    courses: [
      { name: "HTML & CSS Fundamentals", level: "Beginner", link: "/courses/web-dev/fundamentals" },
      { name: "JavaScript Essentials", level: "Beginner", link: "/courses/web-dev/js" },
      { name: "React.js Development", level: "Intermediate", link: "/courses/web-dev/react" },
      { name: "Node.js Backend Development", level: "Intermediate", link: "/courses/web-dev/node-js" },
      { name: "Full Stack Web Development", level: "Advanced", link: "/courses/web-dev/full-stack" },
      { name: "Web Security & Performance", level: "Advanced", link: "/courses/web-dev/web-security" },
    ],
  },
  {
    name: "App Development",
    courses: [
      { name: "iOS Development with Swift", level: "Intermediate", link: "/courses/app-dev/ios" },
      { name: "Android Development with Kotlin", level: "Intermediate", link: "/courses/app-dev/android" },
      { name: "React Native for Cross-Platform Apps", level: "Intermediate", link: "/courses/app-dev/react-native" },
      { name: "Flutter Development", level: "Intermediate", link: "/courses/app-dev/flutter" },
      { name: "Mobile UX/UI Design", level: "Beginner", link: "/courses/app-dev/mobile-ux-ui" },
      { name: "App Monetization Strategies", level: "Advanced", link: "/courses/app-dev/monetization" },
    ],
  },
  {
    name: "DevOps",
    courses: [
      { name: "Introduction to DevOps", level: "Beginner", link: "/courses/devops/intro" },
      { name: "Containerization with Docker", level: "Intermediate", link: "/courses/devops/docker" },
      { name: "Kubernetes Orchestration", level: "Advanced", link: "/courses/devops/kubernetes" },
      { name: "CI/CD Pipeline Implementation", level: "Intermediate", link: "/courses/devops/ci-cd" },
      { name: "Infrastructure as Code", level: "Advanced", link: "/courses/devops/iac" },
      { name: "Cloud Computing (AWS/Azure/GCP)", level: "Intermediate", link: "/courses/devops/cloud" },
    ],
  },
  {
    name: "Machine Learning",
    courses: [
      { name: "Introduction to Machine Learning", level: "Beginner", link: "/courses/ml/intro" },
      { name: "Deep Learning Fundamentals", level: "Intermediate", link: "/courses/ml/deep-learning" },
      { name: "Natural Language Processing", level: "Advanced", link: "/courses/ml/nlp" },
      { name: "Computer Vision with Deep Learning", level: "Advanced", link: "/courses/ml/computer-vision" },
      { name: "Reinforcement Learning", level: "Intermediate", link: "/courses/ml/reinforcement" },
      { name: "ML Ops and Deployment", level: "Advanced", link: "/courses/ml/mlops" },
    ],
  },
  {
    name: "Data Science",
    courses: [
      { name: "Python for Data Science", level: "Beginner", link: "/courses/data-science/python" },
      { name: "Statistical Analysis in R", level: "Intermediate", link: "/courses/data-science/r-stats" },
      { name: "Big Data Processing with Spark", level: "Advanced", link: "/courses/data-science/spark" },
      { name: "Data Visualization Techniques", level: "Intermediate", link: "/courses/data-science/visualization" },
      { name: "Predictive Modeling", level: "Advanced", link: "/courses/data-science/predictive-modeling" },
      { name: "Ethics in Data Science", level: "Intermediate", link: "/courses/data-science/ethics" },
    ],
  },
];

export default function ModernHeader(): ReactElement {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notifications, setNotifications] = useState<number>(3);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCategories = courseCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Book className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">DevXelerate</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  Courses <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {courseCategories.map((category) => (
                    <DropdownMenuSub key={category.name}>
                      <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-56">
                        <DropdownMenuLabel>Courses</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {category.courses.map((course) => (
                          <DropdownMenuItem key={course.name} asChild>
                            <Link href={course.link} className="flex items-center justify-between w-full">
                              <span>{course.name}</span>
                              <Badge variant="secondary">
                                {course.level}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">Programs</Button>
            <Button variant="ghost">Resources</Button>
            <Button variant="ghost">Community</Button>
          </nav>

          {/* Search, Notifications, and User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
              {searchQuery && (
                <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg">
                  {filteredCategories.map((category) => (
                    <div key={category.name} className="px-4 py-2 hover:bg-accent cursor-pointer">
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" size="icon" className="relative" aria-label={`${notifications} notifications`}>
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://avatar.com/user.png" alt="User" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signin" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t">
          <ul className="py-2">
            <li className="px-4 py-2">
              <Link href="/courses" className="block">Courses</Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/programs" className="block">Programs</Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/resources" className="block">Resources</Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/community" className="block">Community</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

