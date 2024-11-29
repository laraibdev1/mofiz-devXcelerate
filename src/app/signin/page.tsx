'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Icons } from "@/app/components/ui/icons"
import { useToast } from "@/app/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"

interface SignInFormData {
  username: string
  password: string
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Welcome back! 👋",
          description: "Successfully signed in to your account.",
          duration: 5000,
        })
        router.push("/dashboard")
      } else {
        throw new Error(data.error || "Invalid credentials")
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: err instanceof Error ? err.message : "Failed to sign in",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-xl bg-white/80 border-t border-l border-white/20 shadow-2xl">
          <CardHeader className="space-y-3 px-8 pt-8">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-lg"
            >
              <Icons.user className="w-12 h-12 text-white" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-500 text-lg">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSignIn} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <Label htmlFor="username" className="text-gray-700 text-lg">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="h-14 text-lg bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <Label htmlFor="password" className="text-gray-700 text-lg">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-14 text-lg bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <Button
                type="submit"
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-base text-center text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                  Sign up
                </a>
              </p>
              <a href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-600">
                Forgot your password?
              </a>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

