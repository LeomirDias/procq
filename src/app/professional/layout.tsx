import { AppMenuBar } from "./_components/app-menu-bar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full">
            <AppMenuBar />
            {children}
        </main>
    )
}