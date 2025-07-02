"use client";

import { Home, Scale, TicketPlus, Search, SettingsIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";
import { PageHeader, PageDescription, PageTitle } from "@/components/ui/page-container-professional";

export function ProfessionalMenuBar() {
    const router = useRouter();
    const session = authClient.useSession();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    };

    const userInitials = session.data?.user?.name
        ?.split(" ")
        .map((name) => name[0])
        .join("");

    return (
        <PageHeader>
            <nav className="fixed top-0 left-0 w-full z-50 bg-background border-t flex justify-between items-center h-16 shadow-md p-3">

                <div className="flex flex-col items-start">
                    <PageTitle >
                        Olá, {session.data?.user.name}!
                    </PageTitle>
                    <PageDescription >Bem vindo (a) ao ProcQ - Procon Itumbiara</PageDescription>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Link href="/professional/front-desk-sector" className="h-full">
                        <Button variant={pathname === "/professional/home" ? "link" : "ghost"} size="lg" className="flex flex-col h-full items-center p-1">
                            <Home className="w-6 h-6" />
                            <span className="text-xs">Recepção</span>
                        </Button>
                    </Link>

                    <Link href="/professional/service-sector">
                        <Button variant={pathname === "/professional/operation" ? "link" : "ghost"} size="lg" className="flex flex-col h-full items-center p-1">
                            <Scale className="w-6 h-6" />
                            <span className="text-xs">Atendimento</span>
                        </Button>
                    </Link>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="lg" variant="ghost" className="flex flex-col items-center gap-1 px-2">
                            <Avatar className="h-10 w-10 border-1 border-gray-300 rounded-full hover:border-primary">
                                <AvatarFallback className="bg-white">{userInitials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleSignOut} className="hover:bg-primary hover:text-white">
                            <LogOutIcon className="w-4 h-4 mr-2 hover:text-white" />Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </PageHeader>


    );
} 