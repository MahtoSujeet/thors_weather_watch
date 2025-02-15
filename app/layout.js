"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Sun, Cloud, Droplets, Code, Menu, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

function Layout({ children }) {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      const { email } = JSON.parse(jsonPayload)
      setUserEmail(email)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserEmail(null)
    window.location.reload()
  }

  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Sun className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">Thor's Weather Watch</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 flex items-center">
                  <Cloud className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <Link href="/forecast" className="text-gray-700 hover:text-blue-600 flex items-center">
                  <Droplets className="h-5 w-5 mr-1" />
                  Forecast
                </Link>
                <Link
                  href="https://github.com/rachnakar/thors_weather_watch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 flex items-center"
                >
                  <Code className="h-5 w-5 mr-1" />
                  Source Code
                </Link>
              </nav>
              <div className="hidden md:flex items-center">
                {userEmail ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{userEmail}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/auth">
                      <Button variant="outline" className="mr-2">Log In</Button>
                    </Link>
                    <Link href="/auth">
                      <Button>Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/forecast">Forecast</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="https://github.com/rachnakar/thors_weather_watch"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source Code
                      </Link>
                    </DropdownMenuItem>
                    {userEmail ? (
                      <>
                        <DropdownMenuItem>
                          <span className="text-sm text-gray-500">{userEmail}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/auth">Log In</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/auth">Sign Up</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        <footer className="bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">© 2024 Thor's Weather Watch. All rights reserved.</p>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/MahtoSujeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
