"use client"

import { redirect } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";

const SignOutButton = () => {
    return (
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Você foi deslogado com sucesso")
                    redirect("/authentication")
                }
            }
        })}>Sair</Button>
    );
}

export default SignOutButton;