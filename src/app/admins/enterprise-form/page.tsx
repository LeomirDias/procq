import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import EnterpriseForm from "./components/enterprise-form";

const EnterpriseFormPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/authentication");
    }
    // if (session.user.enterprise) {
    //     redirect("/dashboard");
    // }



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