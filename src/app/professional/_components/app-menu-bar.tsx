"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth.client"
import { Button } from "@/components/ui/button";
import { Link, LogOutIcon, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { operationsTable, sectorsTable, servicePointsTable, usersTable } from "@/db/schema";
import ClientOperationTimerCard from "../dashboard/_components/operation-timer-card";

const AppMenuBar = ({ sectors, operations, user }: {
    sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[],
    operations: (typeof operationsTable.$inferSelect & { servicePoint: typeof servicePointsTable.$inferSelect })[],
    user: typeof usersTable.$inferSelect
}) => {
    // Busca a operação ativa
    const activeOperation = operations.find(op => op.status === "operating");
    const sector = sectors.find(sector => sector.id === activeOperation?.servicePoint?.sectorId);

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
        <div className="flex items-center justify-between w-full p-4 border-b bg-background shadow-sm rounded-md mt-2">
            <div className="flex flex-col items-start">
                <h1 className="text-lg font-semibold">Olá, {session.data?.user?.name}</h1>
                <p className="text-sm text-muted-foreground">Bem-vindo ao seu painel de controle</p>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h1 className="text-sm text-muted-foreground">{activeOperation?.servicePoint?.name} - {sector?.name}</h1>
                {activeOperation ? (
                    <div className="flex flex-row gap-2 items-center">
                        <p className="flex items-center gap-1">
                            <span className="text-sm text-green-600">
                                {activeOperation?.status === "operating" ? "Em operação" : activeOperation?.status}
                            </span>
                        </p>
                        <div>
                            {activeOperation.createdAT && (
                                <ClientOperationTimerCard createdAt={activeOperation.createdAT} status={activeOperation.status} />
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Nenhuma operação ativa no momento.</p>
                )}
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

export default AppMenuBar;