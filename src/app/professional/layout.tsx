import { ProfessionalMenuBar } from "./_components/professional-menu-bar";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProfessionalMenuBar />
            <main className="w-full pt-15">{/* padding-bottom para não cobrir conteúdo */}
                {children}
            </main>
        </>
    )
}