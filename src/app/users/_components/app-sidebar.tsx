"use client";

import { BriefcaseBusinessIcon, ChartBarBig, Headset, LayoutDashboard, ListCheck, ListOrdered, LogOutIcon, PlusSquareIcon, SettingsIcon, UserRoundPlus, UserRoundSearch, Users } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth.client";


// Menu items.
const itemsEnterprise = [
    {
        title: "Profissionais",
        url: "/users/users-professionals",
        icon: Users,
    },
    {
        title: "Setores",
        url: "/users/sectors",
        icon: BriefcaseBusinessIcon,
    },
    {
        title: "Métricas de atendimentos",
        url: "/users/dashboard",
        icon: ChartBarBig,
    },
]

const itemsProfessionals = [
    {
        title: "Iniciar atendimento",
        url: "/users/professionals-services",
        icon: Headset,
    },
    {
        title: "Meus atendimentos",
        url: "/users/#",
        icon: ListCheck,
    },

]

const itemsClients = [
    {
        title: "Buscar consumidor",
        url: "/users/consumer-research",
        icon: UserRoundSearch,
    },
    {
        title: "Fila de atendimentos",
        url: "/users/#",
        icon: ListOrdered,
    },
]

export function AppSidebar() {

    const router = useRouter();

    const session = authClient.useSession();

    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/authentication");
                },
            },
        });
    };

    const userInitials = session.data?.user?.name
        ?.split(" ")
        .map((name) => name[0])
        .join("");

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4 border-b flex items-center justify-center bg-background" />

            <SidebarContent className="bg-background">
                <SidebarGroup>
                    <SidebarGroupLabel>Administradores</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsEnterprise.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Colaboradores</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsProfessionals.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Consumidor</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsClients.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="py-4 border-t bg-background">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    <Avatar className="h-12 w-12 border-2 border-green-500 rounded-full group-data-[state=collapsed]:h-8 group-data-[state=collapsed]:w-8" >
                                        <AvatarImage src={session.data?.user?.image || ""} />
                                        {!session.data?.user?.image && (
                                            <AvatarFallback>
                                                {userInitials}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="group-data-[state=collapsed]:hidden">
                                        <p className="text-sm">{session.data?.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">{session.data?.user.email}</p>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <SettingsIcon />Configurações
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleSignOut}>
                                    <LogOutIcon />Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
