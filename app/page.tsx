import WordMistakeBook from "@/components/word-mistake-book"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">忘词本 / WordMistakeBook</h1>
      <WordMistakeBook />
    </main>
  )
}
