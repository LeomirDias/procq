"use client";

import { BookUser, ChartLine, LayoutDashboard, LogOutIcon, MapPin, SettingsIcon, Tag, Users } from "lucide-react"
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
        url: "/administrator/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Profissionais",
        url: "/administrator/users-professionals",
        icon: Users,
    },
    {
        title: "Setores",
        url: "/administrator/sectors",
        icon: Tag,
    },
    {
        title: "Consumidores",
        url: "/administrator/clients",
        icon: BookUser,
    },
    {
        title: "Atendimentos",
        url: "/administrator/appointments",
        icon: ChartLine,
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
                    router.push("/");
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
            <SidebarHeader className="p-4 border-b flex items-center justify-center bg-background" />

            <SidebarContent className="bg-background">
                <SidebarGroup>
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
            </SidebarContent>

            <SidebarFooter className="p-4 border-t bg-background">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="flex items-center">
                                    <Avatar className="h-12 w-12 border-2 border-red-500 rounded-full group-data-[state=collapsed]:h-8 group-data-[state=collapsed]:w-8">
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
