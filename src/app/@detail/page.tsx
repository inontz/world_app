import { Boundary } from '@/components/boundary';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';

export default async function Page() {
    const GET_ITEMS = gql`
    query Countries {
        countries {
            code
            name
            emoji
        }
    }
    `
    return (
        <Boundary labels={['Detail']} size="small">
            <div className="prose prose-sm prose-invert max-w-none">
                
            </div>
        </Boundary>
    );
}