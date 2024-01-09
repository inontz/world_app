import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { TabGroup } from '@/components/tab-group';
import { Boundary } from '@/components/boundary';
import { Suspense } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const query = gql`
query Continent {
continents{
  code
  name
  countries{
    code
    name
    emoji
    emojiU
  }
}
}
`

interface Response {

  continents: { code: string; name: string; countries: { code: string; name: string }[] }[]
}

export const metadata: Metadata = {
  title: 'World App',
  description: '...',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { continentSlug: string }
}) {
  const data = await getClient().query<Response>({
    query: query
  });
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed h-screen min-h-screen w-full lg:grid-cols-[280px_1fr] bg-gradient-to-br from-indigo-50 via-cyan-50 to-cyan-100" />
        <main className="flex min-h-screen w-screen flex-col items-center justify-center p-8">
          <div className="z-10 space-y-9">
            <div className="flex justify-between">
              <TabGroup
                path={`/continent`}
                items={[
                  
                  ...data.data.continents.map((continent) => ({
                    text: continent.name,
                    slug: continent.code,
                  })),
                ]}
              />
              <Link href={`/`}></Link>
            </div>
            <Boundary labels={['Countries']} size="small">
              <div className="prose prose-sm prose-invert max-w-none">
                <Suspense fallback={<p>Loading feed...</p>}>
                  {children}
                </Suspense>

              </div>
            </Boundary>
          </div>

        </main>
      </body>
    </html>
  )
}
