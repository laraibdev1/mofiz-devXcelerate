'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Icons } from "@/app/components/ui/icons";
import { useToast } from "@/app/components/ui/use-toast";
import { Checkbox } from "@/app/components/ui/checkbox";
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.username || !formData.email)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields before proceeding.",
      });
      return;
    }
    if (step === 2 && (!formData.password || !formData.confirmPassword)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields before proceeding.",
      });
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
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to DevXcelerate. You can now log in.",
        });
        // Reset form and go back to step 1
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setStep(1);
      } else {
        throw new Error(data.error || "Failed to create account");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
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
            className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center shadow-lg"
          >
            <Icons.user className="w-16 h-16 text-primary-foreground" />
          </motion.div>
          <motion.h2 
            className="mt-6 text-center text-4xl font-extrabold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Join DevXcelerate
          </motion.h2>
          <motion.p 
            className="mt-2 text-center text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Or{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              sign in to your existing account
            </Link>
          </motion.p>
        </div>
        <Card className="mt-8 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* <AnimatePresence mode="wait"> */}
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
                        <Label htmlFor="username" className="text-lg">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          required
                          value={formData.username}
                          onChange={handleInputChange}
                          className="mt-1 text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-lg">Email address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 text-lg p-6"
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
                        <Label htmlFor="password" className="text-lg">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className="mt-1 text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="text-lg">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="mt-1 text-lg p-6"
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
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <label
                          htmlFor="marketing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to receive marketing emails
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              {/* </AnimatePresence> */}
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-4">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full" 
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button 
                  type="button" 
                  className="w-full" 
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  onClick={handleSignUp}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
        <motion.p 
          className="mt-4 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          By signing up, you agree to our{' '}
          <Link href="/terms" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Privacy Policy
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

