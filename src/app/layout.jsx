import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const poppin = Poppins({ subsets: ["latin"], weight: ["300"] })

export const metadata = {
  title: "Vingz | Otaku",
  description: "Website Anime Indonesia",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppin.className} bg-dark`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
