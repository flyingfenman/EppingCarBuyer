"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle, TrendingUp } from "lucide-react"

interface Activity {
  id: number
  location: string
  vehicle: string
  amount: string
  timeAgo: string
}

const SAMPLE_ACTIVITIES: Activity[] = [
  { id: 1, location: "Stamford", vehicle: "BMW 3 Series", amount: "£8,500", timeAgo: "2 mins ago" },
  { id: 2, location: "Peterborough", vehicle: "Audi A4", amount: "£12,300", timeAgo: "5 mins ago" },
  { id: 3, location: "Grantham", vehicle: "VW Golf", amount: "£6,750", timeAgo: "8 mins ago" },
  { id: 4, location: "Lincoln", vehicle: "Ford Focus", amount: "£5,200", timeAgo: "12 mins ago" },
  { id: 5, location: "Boston", vehicle: "Mercedes C-Class", amount: "£14,800", timeAgo: "15 mins ago" },
]

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(SAMPLE_ACTIVITIES.slice(0, 3))
  const [currentIndex, setCurrentIndex] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        const newActivity = SAMPLE_ACTIVITIES[currentIndex % SAMPLE_ACTIVITIES.length]
        const updated = [newActivity, ...prev.slice(0, 2)]
        return updated
      })
      setCurrentIndex((prev) => prev + 1)
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-600 font-semibold mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Activity
          </div>
          <h2 className="text-3xl font-bold mb-2">Recent Purchases</h2>
          <p className="text-muted-foreground">See who's selling their cars right now</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {activities.map((activity, index) => (
            <Card
              key={`${activity.id}-${index}`}
              className="p-4 bg-white/80 backdrop-blur-sm border-l-4 border-l-green-500 animate-in fade-in slide-in-from-right-5 duration-500"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {activity.vehicle} • {activity.location}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.timeAgo}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-lg text-green-600">{activity.amount}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>Paid</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
