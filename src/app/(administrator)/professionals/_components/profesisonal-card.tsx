"use client";
import { Briefcase, IdCard, Lock, MonitorSmartphone, Pencil, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks"
import { useState } from "react";
import { toast } from "sonner";

import { deleteProfessional } from "@/actions/delete-professional";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { professionalsTable, sectorsTable } from "@/db/schema";

import UpsertProfessionalForm from "./upsert-professional-form";

interface ProfessionalCardProps {
    professional: typeof professionalsTable.$inferSelect
    sectors: typeof sectorsTable.$inferSelect[];
}

const ProfessionalCard = ({ professional, sectors }: ProfessionalCardProps) => {

    const [isUpsertPRofessionalFormOpen, setIsUpsertProfessionalFormOpen] = useState(false);

    const professionalInitials = professional.name
        .split(" ")
        .map((name) => name[0])
        .join("");

    const deleteProfessionalAction = useAction(deleteProfessional, {
        onSuccess: () => {
            toast.success("Profissional deletado com sucesso!");
        },
        onError: () => {
            toast.error(`Erro ao deletar profissional.`);
        },
    });

    const handleDeleteProfessional = () => {
        if (!professional?.id) {
            toast.error("Profissional não encontrado.");
            return;
        }
        deleteProfessionalAction.execute({ id: professional?.id || "" });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 relative">
                        <AvatarFallback>{professionalInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-medium">{professional.name}</h3>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-2">
                <Badge variant="outline">
                    <Briefcase className="mr-1" />
                    Cargo: {professional.position}
                </Badge>
                <Badge variant="outline">
                    <MonitorSmartphone className="mr-1" />
                    Setor: {sectors.find(sector => sector.id === professional.sectorId)?.name}
                </Badge>
                <Badge variant="outline">
                    <IdCard className="mr-1" />
                    Registro: {professional.register.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                </Badge>
                <Badge variant="outline">
                    <Lock className="mr-1" />
                    Acesso: {professional.acessLevel === "admin" ? "Administrador" : "Padrão"}
                </Badge>

            </CardContent>
            <Separator />
            <CardFooter className="flex flex-col gap-2">
                <Dialog
                    open={isUpsertPRofessionalFormOpen}
                    onOpenChange={setIsUpsertProfessionalFormOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar profissional
                        </Button>
                    </DialogTrigger>
                    <UpsertProfessionalForm sectors={sectors} professional={{
                        ...professional,
                    }}
                        onSuccess={() => setIsUpsertProfessionalFormOpen(false)}
                    />
                </Dialog>

                {professional && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full hover:bg-red-500 hover:text-white">
                                <Trash2 />
                                Deletar profissional
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza que deseja deletar esse profissional?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita. Todos os dados relacionados a esse profissional serão perdidos permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteProfessional}>Deletar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

            </CardFooter>
        </Card>
    );
}

export default ProfessionalCard;