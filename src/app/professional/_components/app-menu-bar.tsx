"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth.client"
import { Button } from "@/components/ui/button";
import { Link, LogOutIcon, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AppMenuBar() {
    const router = useRouter();
    const session = authClient.useSession();
    const [activeContent, setActiveContent] = useState<string>("file");

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
        <div className="flex items-center justify-between w-full gap-4 p-2 border-b bg-background shadow-sm mb-4">
            <div className="flex flex-col items-start">
                <h1 className="text-lg font-semibold">Olá, {session.data?.user?.name}</h1>
                <p className="text-sm text-muted-foreground">Bem-vindo ao seu painel de controle</p>
            </div>
            <div className="flex gap-2">
                <Button variant={activeContent === "file" ? "default" : "outline"} onClick={() => setActiveContent("file")}>Arquivo</Button>
                <Button variant={activeContent === "edit" ? "default" : "outline"} onClick={() => setActiveContent("edit")}>Editar</Button>
                <Button variant={activeContent === "view" ? "default" : "outline"} onClick={() => setActiveContent("view")}>Visualizar</Button>
                <Button variant={activeContent === "profiles" ? "default" : "outline"} onClick={() => setActiveContent("profiles")}>Perfis</Button>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="lg" className="flex items-center p-0 bg-transparent hover:bg-transparent">
                            <Avatar className="h-12 w-12 border-2 border-primary rounded-full">
                                <AvatarFallback className="text-primary">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="flex flex-col items-center gap-1 py-3">
                            <UserIcon className="w-6 h-6 text-muted-foreground mb-1" />
                            <span className="font-medium text-base">{session.data?.user?.name}</span>
                            <span className="text-xs text-muted-foreground">{session.data?.user?.email}</span>
                        </div>
                        <div className="my-1 border-t" />
                        <DropdownMenuItem onClick={handleSignOut} className="focus:bg-red-50 focus:text-red-700 cursor-pointer gap-2">
                            <LogOutIcon className="w-4 h-4 focus:text-red-700" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
