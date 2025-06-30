import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfessionalAppSidebar } from "./_components/professional-app-sidebar";




export default async function Layout({ children }: { children: React.ReactNode }) {


    return (
        <SidebarProvider>
            <ProfessionalAppSidebar />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}