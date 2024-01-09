import { Boundary } from '@/components/boundary';
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/skeleton-card";
import { TabGroup } from '@/components/tab-group';
import Balancer from 'react-wrap-balancer';
import ReactCountryFlag from "react-country-flag"

export const dynamic = "force-dynamic";

const query = gql`
query Continent($id: ID!) {
    continent(code: $id){
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
// interface Country { 
//     countries: { code: string; name: string }[]
// }

interface Response {

    continent: { code: string; name: string; countries: { code: string; name: string; emoji: string; emojiU: string }[] }
}

export default async function Page({
    params,
}: {
    params: { continentSlug: string };
}) {
    const data = await getClient().query<Response>({
        query: query, variables: ({ "id": params.continentSlug })
    });
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-medium text-gray-400/80">
                <Balancer>{data.data.continent.name}</Balancer>
            </h1>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {data.data.continent.countries.map((country) => (
                    <Boundary labels={[country.name]} size="small" key={country.code}>
                        <p className="text-stone-950">Name: {country.name}</p>
                        <p className="text-stone-950">Code: {country.code}</p>
                        <p className="text-stone-950">Emoji flag: <ReactCountryFlag countryCode={country.code} svg /></p>
                    </Boundary>


                ))}
            </div>
        </div>
    )
}
