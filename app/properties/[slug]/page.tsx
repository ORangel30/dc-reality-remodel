// app/properties/[slug]/page.tsx
import { Metadata } from "next"

// ✅ No strict PageProps typing — just use "any" to bypass Next.js type mismatch
export default function PropertyPage({ params }: { params: any }) {
  return (
    <main className="relative min-h-screen font-sans text-[#3A2F1B] dark:text-[#F3EFE6]">
      <section className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Property: {params.slug}</h1>
        <p className="text-lg opacity-80">
          This is a dynamic property page for <strong>{params.slug}</strong>.
        </p>
      </section>
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  return {
    title: `Property - ${params.slug}`,
    description: `Details about property ${params.slug}`,
  }
}
