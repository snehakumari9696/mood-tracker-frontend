export type MoodType = "happy" | "calm" | "sad" | "angry" | "tired" | "anxious"

export interface MoodEntry {
  id: string
  mood: MoodType
  note: string
  date: Date
}

export interface MoodOption {
  type: MoodType
  emoji: string
  label: string
  color: string
  bgClass: string
}

export const MOOD_OPTIONS: MoodOption[] = [
  { type: "happy", emoji: "\u{1F60A}", label: "Happy", color: "#f9a825", bgClass: "bg-[#fef9c3]" },
  { type: "calm", emoji: "\u{1F60C}", label: "Calm", color: "#7cb342", bgClass: "bg-[#dcfce7]" },
  { type: "sad", emoji: "\u{1F614}", label: "Sad", color: "#5c6bc0", bgClass: "bg-[#e0e7ff]" },
  { type: "angry", emoji: "\u{1F621}", label: "Angry", color: "#e53935", bgClass: "bg-[#fee2e2]" },
  { type: "tired", emoji: "\u{1F634}", label: "Tired", color: "#8d6e63", bgClass: "bg-[#f5f0eb]" },
  { type: "anxious", emoji: "\u{1F630}", label: "Anxious", color: "#ab47bc", bgClass: "bg-[#f3e8ff]" },
]

export function getMoodOption(type: MoodType): MoodOption {
  return MOOD_OPTIONS.find((m) => m.type === type)!
}

// Seed data for demo purposes
export function getSeedEntries(): MoodEntry[] {
  const now = new Date()
  return [
    {
      id: "1",
      mood: "happy",
      note: "Had a wonderful morning walk in the park. The sun felt great!",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 0, 9, 30),
    },
    {
      id: "2",
      mood: "calm",
      note: "Meditation session really helped me center myself today.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 20, 15),
    },
    {
      id: "3",
      mood: "anxious",
      note: "Big presentation coming up tomorrow. Feeling a bit nervous.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 8, 0),
    },
    {
      id: "4",
      mood: "happy",
      note: "Caught up with an old friend over coffee.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 14, 0),
    },
    {
      id: "5",
      mood: "tired",
      note: "Didn't sleep well last night. Need to rest more.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 7, 45),
    },
    {
      id: "6",
      mood: "sad",
      note: "Missing home a little today.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 19, 30),
    },
    {
      id: "7",
      mood: "calm",
      note: "Finished a good book. Feeling at peace.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 21, 0),
    },
    {
      id: "8",
      mood: "happy",
      note: "Cooked a new recipe and it turned out amazing!",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 18, 0),
    },
    {
      id: "9",
      mood: "angry",
      note: "Frustrating day at work. Need to decompress.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 17, 30),
    },
    {
      id: "10",
      mood: "calm",
      note: "Yoga class was wonderful today.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 10, 0),
    },
  ]
}
