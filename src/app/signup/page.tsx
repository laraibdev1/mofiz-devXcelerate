'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Icons } from "@/app/components/ui/icons";
import { Checkbox } from "@/app/components/ui/checkbox";
import Link from 'next/link';

interface Notification {
  type: 'success' | 'error';
  message: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    marketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.username || !formData.email)) {
      showNotification('error', "Please fill in all fields before proceeding.");
      return;
    }
    if (step === 2 && (!formData.password || !formData.confirmPassword)) {
      showNotification('error', "Please fill in all fields before proceeding.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      showNotification('error', "Passwords do not match. Please ensure both passwords are identical.");
      setIsLoading(false);
      return;
    }

    if (!formData.terms) {
      showNotification('error', "Please accept the terms and conditions to proceed.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          marketing: formData.marketing,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('success', "Account created successfully! Welcome to DevXcelerate. You can now log in.");
        setFormData({ username: '', email: '', password: '', confirmPassword: '', terms: false, marketing: false });
        setStep(1);
      } else {
        throw new Error(data.error || "Failed to create account");
      }
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.div
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center shadow-lg"
          >
            <Icons.user className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <motion.h2 
            className="mt-6 text-center text-3xl font-extrabold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Join DevXcelerate
          </motion.h2>
          <motion.p 
            className="mt-2 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Or{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              sign in to your account
            </Link>
          </motion.p>
        </div>
        <Card className="mt-8 shadow-xl">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          required
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          name="terms"
                          checked={formData.terms}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, terms: checked === true }))
                          }
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="marketing" 
                          name="marketing"
                          checked={formData.marketing}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, marketing: checked === true }))
                          }
                        />
                        <label
                          htmlFor="marketing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I would like to receive promotional emails
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <Button variant="outline" onClick={handlePrevStep} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={step === 3 ? handleSignUp : handleNextStep} disabled={isLoading}>
                {step === 3 ? (isLoading ? "Signing up..." : "Sign up") : "Next"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

