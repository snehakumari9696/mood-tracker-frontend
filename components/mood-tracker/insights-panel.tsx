"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Sparkles, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { type MoodEntry, MOOD_OPTIONS, getMoodOption } from "@/lib/mood-data"
import { cn } from "@/lib/utils"

interface InsightsPanelProps {
  entries: MoodEntry[]
}

function getMoodDistribution(entries: MoodEntry[]) {
  const counts: Record<string, number> = {}
  for (const entry of entries) {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1
  }
  return MOOD_OPTIONS.map((opt) => ({
    name: opt.label,
    value: counts[opt.type] || 0,
    emoji: opt.emoji,
    color: opt.color,
    type: opt.type,
  })).filter((d) => d.value > 0)
}

function getTopMood(entries: MoodEntry[]) {
  if (entries.length === 0) return null
  const counts: Record<string, number> = {}
  for (const entry of entries) {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1
  }
  const top = Object.entries(counts).sort(([, a], [, b]) => b - a)[0]
  return getMoodOption(top[0] as MoodEntry["mood"])
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; payload: { name: string; emoji: string } }>
}

function ChartTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="glass-card rounded-xl px-3 py-2 text-xs shadow-lg">
        <span className="mr-1">{data.payload.emoji}</span>
        <span className="font-medium text-foreground">{data.payload.name}</span>
        <span className="ml-2 text-muted-foreground">{data.value} {data.value === 1 ? "time" : "times"}</span>
      </div>
    )
  }
  return null
}

export function InsightsPanel({ entries }: InsightsPanelProps) {
  const distribution = useMemo(() => getMoodDistribution(entries), [entries])
  const topMood = useMemo(() => getTopMood(entries), [entries])
  const totalEntries = entries.length

  if (entries.length === 0) {
    return (
      <Card className="glass-card border-0 shadow-xl shadow-primary/[0.08] animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-[hsl(160,40%,55%)]" />
            <h2 className="font-display text-lg font-semibold text-foreground">Insights</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent mb-4">
              <Sparkles className="h-7 w-7 text-accent-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Insights are on the way
            </p>
            <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed">
              Once you log a few moods, we will show you patterns and trends. Keep going!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      {/* Top Mood Highlight */}
      {topMood && (
        <Card className="glass-card border-0 shadow-xl shadow-primary/[0.08] overflow-hidden">
          <div className="h-1" style={{ backgroundColor: topMood.color }} />
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Weekly Highlight</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 hover:scale-105",
                topMood.bgClass
              )}>
                <span className="text-3xl">{topMood.emoji}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-0.5">Your most frequent mood</p>
                <p className="font-display text-xl font-semibold text-foreground">{topMood.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Based on {totalEntries} check-in{totalEntries !== 1 ? "s" : ""} this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mood Distribution Chart */}
      <Card className="glass-card border-0 shadow-xl shadow-primary/[0.08]">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-[hsl(160,40%,55%)]" />
            <h2 className="font-display text-lg font-semibold text-foreground">Mood Distribution</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {"Here's how your emotions have been showing up lately"}
          </p>

          {/* Bar Chart */}
          <div className="h-48 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(270,20%,92%)" vertical={false} />
                <XAxis
                  dataKey="emoji"
                  tick={{ fontSize: 18 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "hsl(270,10%,50%)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={40}>
                  {distribution.map((entry) => (
                    <Cell key={entry.type} fill={entry.color} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {distribution.map((entry) => (
                      <Cell key={entry.type} fill={entry.color} opacity={0.8} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start md:pt-4">
              {distribution.map((d) => (
                <div key={d.type} className="flex items-center gap-1.5 rounded-lg bg-muted/30 px-2.5 py-1.5 transition-colors hover:bg-muted/50">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {d.emoji} {d.name}
                  </span>
                  <span className="text-xs font-semibold text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
