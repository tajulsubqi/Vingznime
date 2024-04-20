"use client"
import { ArrowCircleLeft } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const HeaderDashboard = ({ title }) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <button
        onClick={handleBack}
        className="flex items-center gap-1 md:mx-4 text-primary hover:text-accent duration-200 transition"
      >
        <ArrowCircleLeft size={30} />
        <span>Back</span>
      </button>

      <h3 className="text-2xl md:text-3xl text-center md:-mt-3 text-primary font-bold font-sans">
        {title}
      </h3>
    </>
  )
}

export default HeaderDashboard
