import { Boundary } from '@/components/boundary';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Boundary labels={['parallel-routes/@views/layout.tsx']} size="small">
            <div className="space-y-8">
                
                {children}
            </div>
        </Boundary>
    );
}