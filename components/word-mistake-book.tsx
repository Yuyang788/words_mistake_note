"use client"

import { useState, useEffect } from "react"
import { WordForm } from "./word-form"
import { WordTable } from "./word-table"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { WordEntry } from "@/types/word"

export default function WordMistakeBook() {
  const [words, setWords] = useState<WordEntry[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load words from localStorage on component mount
  useEffect(() => {
    const savedWords = localStorage.getItem("wordMistakes")
    if (savedWords) {
      setWords(JSON.parse(savedWords))
    }
  }, [])

  // Save words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wordMistakes", JSON.stringify(words))
  }, [words])

  const addWord = (word: string) => {
    const normalizedWord = word.trim().toLowerCase()

    if (!normalizedWord) return

    // Check if word already exists
    const existingWordIndex = words.findIndex((entry) => entry.word.toLowerCase() === normalizedWord)

    if (existingWordIndex >= 0) {
      // Increment mistake count for existing word
      const updatedWords = [...words]
      updatedWords[existingWordIndex] = {
        ...updatedWords[existingWordIndex],
        mistakeCount: updatedWords[existingWordIndex].mistakeCount + 1,
      }
      setWords(updatedWords)
    } else {
      // Add new word
      setWords([...words, { id: Date.now().toString(), word: normalizedWord, mistakeCount: 1 }])
    }
  }

  const deleteWord = (id: string) => {
    setWords(words.filter((word) => word.id !== id))
  }

  const resetAllWords = () => {
    setWords([])
    setIsDialogOpen(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <WordForm onAddWord={addWord} />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Words List</h2>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={words.length === 0}>
                Clear All Words
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete all your recorded words and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllWords}>Yes, delete all</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <WordTable words={words.sort((a, b) => b.mistakeCount - a.mistakeCount)} onDeleteWord={deleteWord} />
      </div>
    </div>
  )
}
