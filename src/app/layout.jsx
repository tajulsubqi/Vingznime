import "@/src/app//globals.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ProgressBar from "@/src/components/ProgressBar"

export const metadata = {
  title: "Vingznime | TAJUL",
  description:
    "This website has a complete anime database, with information such as synopsis, genre, release year, and rating.",
}

export default async function RootLayout({ children }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="font-manrope bg-Black-8" suppressHydrationWarning={true}>
          <ProgressBar>{children}</ProgressBar>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </body>
      </html>
    </SessionProvider>
  )
}
