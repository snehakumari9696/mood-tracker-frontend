"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Check, Sparkles } from "lucide-react"
import { MOOD_OPTIONS, type MoodType } from "@/lib/mood-data"
import { cn } from "@/lib/utils"

interface AddMoodCardProps {
  onAddMood: (mood: MoodType, note: string) => void
}

export function AddMoodCard({ onAddMood }: AddMoodCardProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null)
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (!selectedMood) return
    onAddMood(selectedMood, note)
    setSaved(true)
    setTimeout(() => {
      setSelectedMood(null)
      setNote("")
      setSaved(false)
    }, 1800)
  }

  return (
    <Card className="glass-card border-0 shadow-xl shadow-primary/[0.08] animate-fade-in-up overflow-hidden" style={{ animationDelay: "0.1s" }}>
      <div className="h-1 bg-gradient-to-r from-primary via-[hsl(340,50%,72%)] to-[hsl(160,40%,55%)]" />
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="h-4 w-4 text-[hsl(340,50%,72%)]" />
          <h2 className="font-display text-lg font-semibold text-foreground">How are you feeling?</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Take a moment to check in with yourself
        </p>

        {/* Mood Selection */}
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 mb-6 stagger-children">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.type}
              type="button"
              onClick={() => setSelectedMood(mood.type)}
              className={cn(
                "group flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-all duration-300 cursor-pointer",
                "hover:scale-[1.08] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedMood === mood.type
                  ? `${mood.bgClass} shadow-md scale-[1.08] ring-2 ring-primary/20`
                  : "bg-muted/40 hover:bg-muted/70"
              )}
              aria-label={`Select mood: ${mood.label}`}
            >
              <span className={cn(
                "text-2xl md:text-3xl transition-transform duration-300",
                selectedMood === mood.type && "animate-gentle-bounce"
              )}>
                {mood.emoji}
              </span>
              <span className={cn(
                "text-xs font-medium transition-colors duration-200",
                selectedMood === mood.type ? "text-foreground" : "text-muted-foreground"
              )}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Note Textarea */}
        <Textarea
          placeholder="Want to share what made you feel this way?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mb-5 resize-none rounded-xl border-border/40 bg-muted/20 placeholder:text-muted-foreground/50 focus:bg-card focus:border-primary/30 transition-all duration-300"
          rows={3}
        />

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!selectedMood || saved}
          className={cn(
            "w-full rounded-xl h-12 text-sm font-semibold transition-all duration-400",
            saved
              ? "bg-[hsl(160,40%,55%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(160,40%,55%)] shadow-lg shadow-[hsl(160,40%,55%)]/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.01]"
          )}
        >
          {saved ? (
            <span className="flex items-center gap-2 animate-scale-in">
              <Check className="h-4 w-4" />
              Saved! Nice job reflecting
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Save My Mood
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
