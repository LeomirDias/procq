"use client";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks"
import { useState } from "react";
import { toast } from "sonner";

import { deleteSector } from "@/actions/delete-sector";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { sectorsTable } from "@/db/schema";

import UpsertSectorForm from "./upsert-sector-form";



interface SectorCardProps {
    sector: typeof sectorsTable.$inferSelect
}

const SectorCard = ({ sector }: SectorCardProps) => {

    const [isUpsertSectorFormOpen, setIsUpsertSectorFormOpen] = useState(false);

    const deleteSectorAction = useAction(deleteSector, {
        onSuccess: () => {
            toast.success("Setor deletado com sucesso!");
        },
        onError: () => {
            toast.error(`Erro ao deletar setor.`);
        },
    });

    const handleDeleteSector = () => {
        if (!sector?.id) {
            toast.error("Setor não encontrado.");
            return;
        }
        deleteSectorAction.execute({ id: sector?.id || "" });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <h3 className="text-sm font-medium">{sector.name}</h3>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                    Profissionais
                </p>
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-col gap-2">
                <Dialog
                    open={isUpsertSectorFormOpen}
                    onOpenChange={setIsUpsertSectorFormOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">Ver detalhes</Button>
                    </DialogTrigger>
                    <UpsertSectorForm sector={{
                        ...sector,
                    }}
                        onSuccess={() => setIsUpsertSectorFormOpen(false)}
                    />
                </Dialog>

                {sector && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full hover:bg-red-500 hover:text-white">
                                <Trash2 />
                                Deletar setor
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza que deseja deletar esse setor?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita. Todos os dados relacionados a esse setor serão perdidos permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteSector}>Deletar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

            </CardFooter>
        </Card>
    );
}

export default SectorCard;