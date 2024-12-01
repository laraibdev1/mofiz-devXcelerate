"use client"; // Add this line to mark the file as a client component

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth0 } from '@auth0/nextjs-auth0';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Icons } from "@/app/components/ui/icons";
import { useToast } from "@/app/components/ui/use-toast";
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
  const { loginWithRedirect, isAuthenticated, user } = useAuth0(); // Correct usage of useAuth0
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      toast({
        title: "Success! 🎉",
        description: `Welcome, ${user.name || user.email}! Your account is connected.`,
        duration: 5000,
      });
    }
  }, [isAuthenticated, user, toast]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("signup successful");
        toast({
          title: "Success! 🎉",
          description: "Your account has been created successfully.",
          duration: 5000,
        });
        setFormData({ username: "", password: "", confirmPassword: "" });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err instanceof Error ? err.message : "Failed to create account",
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
              <Icons.user className="w-12 h-12 text-white" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-500 text-lg">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
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
                      type={field.includes("password") ? "password" : "text"}
                      value={formData[field as keyof SignUpFormData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="h-14 text-lg bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder={`Enter your ${field === "confirmPassword" ? "password again" : field}`}
                      required
                      disabled={isLoading}
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
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icons.google className="mr-2 h-6 w-6" />
                Sign up with Google
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
