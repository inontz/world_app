import { Boundary } from '@/components/boundary';
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/skeleton-card";
import { TabGroup } from '@/components/tab-group';
import Balancer from 'react-wrap-balancer';

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
    <>
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      ><Balancer>Select continent from tab to view countries.</Balancer></h1>
    </>


  )
}
