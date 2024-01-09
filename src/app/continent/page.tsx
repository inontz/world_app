import { Boundary } from '@/components/boundary';
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/skeleton-card";
import { TabGroup } from '@/components/tab-group';

export const dynamic = "force-dynamic";

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

export default async function Home({
    params,
}: {
    params: { continentSlug: string };
}) {
    const data = await getClient().query<Response>({
        query: query
    });
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-medium text-gray-400/80">
                All
            </h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {data.data.continents.map((continent) => (
                    continent.countries.map((country) => (
                        <SkeletonCard key={country.code} />
                    ))))}
            </div>
        </div>
    )
}
