"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { WordEntry } from "@/types/word"
import { Trash2 } from "lucide-react"

interface WordTableProps {
  words: WordEntry[]
  onDeleteWord: (id: string) => void
}

export function WordTable({ words, onDeleteWord }: WordTableProps) {
  if (words.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No words added yet. Start by adding words you frequently misspell.
      </div>
    )
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word</TableHead>
            <TableHead className="text-center">Mistake Count</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.word}</TableCell>
              <TableCell className="text-center">{entry.mistakeCount}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteWord(entry.id)}
                  aria-label={`Delete ${entry.word}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
