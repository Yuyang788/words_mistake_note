"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface WordFormProps {
  onAddWord: (word: string) => void
}

export function WordForm({ onAddWord }: WordFormProps) {
  const [word, setWord] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (word.trim()) {
      onAddWord(word)
      setWord("")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word you misspelled..."
            className="flex-1"
          />
          <Button type="submit">Add Word</Button>
        </form>
      </CardContent>
    </Card>
  )
}
