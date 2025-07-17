import { Metadata } from "next"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
    title: "ProcQ - Cadastro",
    description: "Cadastro de usuários",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
            <main className="w-full">
                {children}
            </main>
        </ThemeProvider>
    )
}