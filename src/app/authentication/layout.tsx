import { Metadata } from "next"

export const metadata: Metadata = {
    title: "ProcQ - Cadastro",
    description: "Cadastro de usuários",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full">
            {children}
        </main>
    )
}