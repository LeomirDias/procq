"use client";

import { BookUser, ChartLine, CircleHelp, CreditCard, LayoutDashboard, LogOutIcon, MapPin, PlaySquareIcon, SettingsIcon, Tag, Users } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { authClient } from "@/lib/auth.client"


// Menu items.
const itemsEnterprise = [
    {
        title: "Home",
        url: "/admins/home",
        icon: LayoutDashboard,
    },
    {
        title: "Profissionais",
        url: "/admins/professionals",
        icon: Users,
    },
    {
        title: "Setores",
        url: "/admins/sectors",
        icon: Tag,
    },
    {
        title: "Pontos de atendimento",
        url: "/admins/service-points",
        icon: MapPin,
    },
    {
        title: "Clientes",
        url: "/admins/clients",
        icon: BookUser,
    },
    {
        title: "Atendimentos",
        url: "/admins/appointments",
        icon: ChartLine,
    },
]

const othersItems = [
    {
        title: "Planos",
        url: "/admins/subscription",
        icon: CreditCard,
    },
    {
        title: "Tutoriais",
        url: "/admins/tutorials",
        icon: PlaySquareIcon,
    },
    {
        title: "Suporte WiseFlow",
        url: "/admins/adm-support",
        icon: CircleHelp,
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
        .split(" ")
        .map((name) => name[0])
        .join("");

    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader className="p-4 border-b flex items-center justify-center bg-background">
                {/* <h1 className="text-xl font-bold text-primary">WiseFlow</h1>
                <p className="text-xs text-muted-foreground">{session.data?.user?.enterprise?.name}</p> */}
            </SidebarHeader>

            <SidebarContent className="bg-background">
                <SidebarGroup>
                    <SidebarGroupLabel>Minha empresa</SidebarGroupLabel>
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
                    <SidebarGroupLabel>Outros</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {othersItems.map((item) => (
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

            <SidebarFooter className="p-4 border-t bg-background">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="flex items-center">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>
                                            {userInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{session.data?.user?.name}</p>
                                        <p className="text-sm text-muted-foreground">{session.data?.user.email}</p>
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
