"use client"

import { useRef, useCallback, useState, useEffect} from "react"
import {addMood , getMoods} from "@/lib/api"

// ✅ Named imports for components
import  HeroSection  from "@/components/mood-tracker/hero-section"
import { Header } from "@/components/mood-tracker/header"
import { AddMoodCard } from "@/components/mood-tracker/add-mood-card"
import  MoodHistory  from "@/components/mood-tracker/mood-history"
import { InsightsPanel } from "@/components/mood-tracker/insights-panel"
import { SelfcareSuggestions } from "@/components/mood-tracker/selfcare-suggestions"

export default function Page() {
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [entries, setEntries]= useState<any[]>([])

  const scrollToDashboard = useCallback(() => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])
const handleAddMood =async(mood: string, note:string)=> {
    try{
        await addMood(mood,note)
        const updated=await getMoods()
        setEntries(updated)
        console.log("Mood Saved Successfully")
        }catch(error){
            console.error("Failed to save mood", error)}}
            useEffect(()=> {
                const fetchMoods=async()=> {
                    const data=await getMoods()
                    setEntries(data)}
                    fetchMoods()},[])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onEnter={scrollToDashboard} />

      {/* Dashboard Section */}
      <div ref={dashboardRef} className="relative mx-auto max-w-5xl px-4 pb-20 md:px-6">
        <Header />

        <div className="grid gap-6 lg:grid-cols-5 mt-8">
          {/* Left Column: Add Mood + Selfcare */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <AddMoodCard onAddMood={handleAddMood} />
            <SelfcareSuggestions currentMood={null} />
          </div>

          {/* Center Column: Mood History + Insights */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <MoodHistory />
            <InsightsPanel entries={entries} />
          </div>
        </div>
      </div>
    </div>
  )
}