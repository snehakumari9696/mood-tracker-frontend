"use client"

import React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Wind, Sun, Moon, Music, BookOpen, Coffee, TreePine } from "lucide-react"
import { type MoodType } from "@/lib/mood-data"
import { cn } from "@/lib/utils"

interface SelfcareSuggestionsProps {
  currentMood: MoodType | null
}

interface Suggestion {
  icon: React.ElementType
  title: string
  description: string
  color: string
  bgColor: string
}

const SUGGESTIONS_MAP: Record<MoodType, Suggestion[]> = {
  happy: [
    { icon: Sun, title: "Savor the moment", description: "Write down 3 things that made you smile today", color: "text-amber-600", bgColor: "bg-amber-50" },
    { icon: Music, title: "Share the joy", description: "Call someone you love and spread the positivity", color: "text-amber-600", bgColor: "bg-amber-50" },
    { icon: BookOpen, title: "Gratitude journal", description: "Capture this feeling so you can revisit it later", color: "text-amber-600", bgColor: "bg-amber-50" },
  ],
  calm: [
    { icon: Wind, title: "Deep breathing", description: "Continue this peaceful state with 5 minutes of mindful breathing", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { icon: TreePine, title: "Nature walk", description: "Take a gentle stroll and enjoy the stillness around you", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { icon: BookOpen, title: "Reflective reading", description: "Pick up a book that nourishes your mind", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  ],
  sad: [
    { icon: Heart, title: "Be gentle with yourself", description: "It is okay to feel this way. You are allowed to rest.", color: "text-indigo-500", bgColor: "bg-indigo-50" },
    { icon: Coffee, title: "Comfort ritual", description: "Make a warm drink and wrap yourself in something cozy", color: "text-indigo-500", bgColor: "bg-indigo-50" },
    { icon: Music, title: "Listen to soothing music", description: "Let calming sounds hold space for your feelings", color: "text-indigo-500", bgColor: "bg-indigo-50" },
  ],
  angry: [
    { icon: Wind, title: "Cooling breaths", description: "Inhale for 4 counts, hold for 4, exhale for 6. Repeat.", color: "text-rose-500", bgColor: "bg-rose-50" },
    { icon: TreePine, title: "Step outside", description: "Fresh air and movement can help release tension", color: "text-rose-500", bgColor: "bg-rose-50" },
    { icon: BookOpen, title: "Journal it out", description: "Write down what frustrated you. Let the page hold it for you.", color: "text-rose-500", bgColor: "bg-rose-50" },
  ],
  tired: [
    { icon: Moon, title: "Rest without guilt", description: "Your body is telling you something. Listen to it.", color: "text-stone-500", bgColor: "bg-stone-50" },
    { icon: Coffee, title: "Gentle hydration", description: "A glass of water or herbal tea can help more than you think", color: "text-stone-500", bgColor: "bg-stone-50" },
    { icon: Wind, title: "Stretching break", description: "5 minutes of gentle stretching to re-energize your body", color: "text-stone-500", bgColor: "bg-stone-50" },
  ],
  anxious: [
    { icon: Wind, title: "Grounding exercise", description: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste", color: "text-purple-500", bgColor: "bg-purple-50" },
    { icon: Heart, title: "Self-compassion pause", description: "Place a hand on your heart. You are safe right now.", color: "text-purple-500", bgColor: "bg-purple-50" },
    { icon: Music, title: "Calming sounds", description: "Try rain sounds or lo-fi music to slow your thoughts", color: "text-purple-500", bgColor: "bg-purple-50" },
  ],
}

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { icon: Wind, title: "Mindful breathing", description: "Start with 3 deep breaths to center yourself", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Heart, title: "Check in with yourself", description: "Take a moment to notice how your body feels right now", color: "text-[hsl(340,50%,60%)]", bgColor: "bg-[hsl(340,50%,95%)]" },
  { icon: BookOpen, title: "Reflect and write", description: "Journaling helps you process emotions at your own pace", color: "text-[hsl(160,40%,40%)]", bgColor: "bg-[hsl(160,40%,92%)]" },
]

export function SelfcareSuggestions({ currentMood }: SelfcareSuggestionsProps) {
  const suggestions = currentMood ? SUGGESTIONS_MAP[currentMood] : DEFAULT_SUGGESTIONS

  return (
    <Card className="glass-card border-0 shadow-lg shadow-primary/5 animate-fade-in-up overflow-hidden" style={{ animationDelay: "0.4s" }}>
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="h-4 w-4 text-[hsl(340,50%,72%)]" />
          <h2 className="font-display text-lg font-semibold text-foreground">Self-Care Corner</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {currentMood
            ? "Here are some gentle suggestions just for you right now"
            : "Small acts of kindness toward yourself make a big difference"}
        </p>

        <div className="flex flex-col gap-3 stagger-children">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon
            return (
              <div
                key={suggestion.title}
                className="group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-muted/40 hover:shadow-sm cursor-default"
              >
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  suggestion.bgColor
                )}>
                  <Icon className={cn("h-5 w-5", suggestion.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground mb-0.5">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{suggestion.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
