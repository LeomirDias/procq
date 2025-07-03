"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card } from "./card";

export const AccessDenied = () => {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/users");
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <Card className="w-full max-w-md p-6 space-y-4">
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-destructive">
                        Acesso Negado
                    </h2>
                    <p className="text-muted-foreground">
                        Você não tem permissão para acessar esta página.
                        Redirecionando em 5 segundos...
                    </p>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-destructive transition-all duration-[5000ms] ease-linear w-0 animate-progress"
                        style={{ animationDuration: "5000ms" }}
                    />
                </div>
            </Card>
        </div>
    );
}; 