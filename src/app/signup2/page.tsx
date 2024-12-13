"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth0 } from '@auth0/auth0-react';
import { User, LogIn } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

interface SignUpFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { loginWithRedirect, isAuthenticated, user, isLoading: authLoading } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', content: string } | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      setMessage({
        type: 'success',
        content: `Welcome, ${user.name || user.email}! Your account is connected.`
      });
    }
  }, [isAuthenticated, user]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        content: "Passwords do not match. Please ensure both passwords are identical."
      });
      return;
    }

    setIsLoading(true);

    try {
      // Instead of making a direct API call, we'll use Auth0's signup method
      await loginWithRedirect({
        screen_hint: "signup",
        username: formData.username,
        password: formData.password,
      });
      
      // The success message will be set in the useEffect hook when isAuthenticated becomes true
    } catch (err) {
      setMessage({
        type: 'error',
        content: err instanceof Error ? err.message : "Failed to create account!"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    loginWithRedirect({
      connection: "google-oauth2",
      screen_hint: "signup",
    });
  };

  const MessageDisplay = ({ message }: { message: { type: 'success' | 'error', content: string } | null }) => {
    if (!message) return null;
    return (
      <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="alert">
        {message.content}
      </div>
    );
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <div>You are already signed up and logged in!</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-xl bg-white/80 border-t border-l border-white/20 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-3 px-8 pt-8">
            <motion.div
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-lg"
            >
              <User className="w-12 h-12 text-white" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-500 text-lg">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <MessageDisplay message={message} />
            <form onSubmit={handleSignUp} className="space-y-8">
              <AnimatePresence>
                {["username", "password", "confirmPassword"].map((field, index) => (
                  <motion.div
                    key={`${field}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <Label htmlFor={field} className="text-gray-700 text-lg">
                      {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      name={field}
                      type={field.includes("password") ? "password" : "text"}
                      value={formData[field as keyof SignUpFormData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="h-14 text-lg bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder={`Enter your ${field === "confirmPassword" ? "password again" : field}`}
                      required
                      disabled={isLoading}
                      aria-label={field === "confirmPassword" ? "Confirm Password" : field}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full space-y-4"
            >
              <Button
                type="submit"
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <LogIn className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="mr-2 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign up with Google
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

