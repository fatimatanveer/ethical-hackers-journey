import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientOnly from "@/components/client-only"   // <--- Must be default import
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ethical Hacker's Journey: Red Team/Blue Team Simulator",
  description: "An educational cybersecurity simulation game for learning ethical hacking and defense techniques",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  )
}
