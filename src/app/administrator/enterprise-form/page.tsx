
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AccessDenied } from "@/components/ui/access-denied";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import EnterpriseForm from "./components/enterprise-form";

const EnterpriseFormPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/");
    }

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, session.user.id),
    });

    if (user?.role !== "admin") {
        return <AccessDenied />
    }

    if (user?.role === "admin" && session.user.enterprise) {
        redirect("/administrator/dashboard");
    }


    return (
        <Dialog open>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Quase lá!</DialogTitle>
                    <DialogDescription>
                        Cadastre sua empresa para começar a usar o WiseFlow.
                    </DialogDescription>
                </DialogHeader>
                <EnterpriseForm />
            </DialogContent>
        </Dialog>
    );
}

export default EnterpriseFormPage;