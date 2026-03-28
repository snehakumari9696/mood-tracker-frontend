"use client"

import { Leaf } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-30 -mx-4 md:-mx-6 mb-8">
      <div className="glass-card rounded-b-2xl px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
              <Leaf className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold tracking-tight text-foreground">
                Mood Tracker
              </h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Track your emotions. Understand yourself better.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium" role="img" aria-label="seedling">
              {"🌱"}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
