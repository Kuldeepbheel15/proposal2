"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Volume2, VolumeX } from "lucide-react"
import FirstScreen from "@/components/FirstScreen"
import QuestionScreen from "@/components/QuestionScreen"
import BalloonsScreen from "@/components/BalloonsScreen"
import PhotoScreen from "@/components/PhotoScreen"
import FinalScreen from "@/components/FinalScreen"
import CuteLoader from "@/components/CuteLoader"
import { HER_NAME } from "@/config"

function FloatingHearts() {
  const [hearts, setHearts] = useState([])
  useEffect(() => {
    const icons = ["💖", "💕", "✨", "💗", "🌸"]
    setHearts(Array.from({ length: 16 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      dur: 9 + Math.random() * 9,
      delay: Math.random() * 10,
    })))
  }, [])
  return hearts.map((h) => (
    <span key={h.id} className="float-heart"
      style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}>
      {h.icon}
    </span>
  ))
}

export default function ProposalSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const startMusic = () => {
    const a = audioRef.current
    if (a) { a.volume = 0.5; a.play().catch(() => {}) }
  }
  const toggleMute = () => {
    const a = audioRef.current
    if (!a) return
    a.muted = !muted
    setMuted(!muted)
  }
  const nextScreen = (screen) => setCurrentScreen(screen)

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-[#12030e] to-rose-950 relative overflow-hidden">
      <FloatingHearts />
      <audio ref={audioRef} src="/audio/bg.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}
        {currentScreen === "first" && (
          <FirstScreen key="first" onNext={() => { startMusic(); nextScreen("question1") }} />
        )}
        {currentScreen === "question1" && (
          <QuestionScreen key="question1" question={`Do you like surprises, ${HER_NAME}?`}
            onYes={() => nextScreen("question2")} isFirst={true} />
        )}
        {currentScreen === "question2" && (
          <QuestionScreen key="question2" question="Do you like me?"
            onYes={() => nextScreen("balloons")} isFirst={false} />
        )}
        {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}
        {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}
        {currentScreen === "final" && <FinalScreen key="final" />}
      </AnimatePresence>

      {currentScreen !== "loader" && currentScreen !== "first" && (
        <button onClick={toggleMute} aria-label="Toggle music"
          className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-pink-950/50 backdrop-blur border border-pink-400/30 text-pink-200 flex items-center justify-center">
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </div>
  )
}
