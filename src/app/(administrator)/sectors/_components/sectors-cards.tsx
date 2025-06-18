"use client";
import { MapPin, Pencil, Trash2, User } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { professionalsTable, sectorsTable, servicePointsTable } from "@/db/schema";

import UpsertSectorForm from "./upsert-sector-form";

interface SectorCardProps {
    sector: typeof sectorsTable.$inferSelect & {
        professionals: typeof professionalsTable.$inferSelect[]
        servicePoints: typeof servicePointsTable.$inferSelect[]
    }
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
                <div className="flex items-center">
                    <h3 className="text-sm font-medium">{sector.name}</h3>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col space-y-2">
                <h4 className="text-sm font-medium">Profissionais</h4>
                <p className="text-sm text-muted-foreground flex flex-wrap gap-2">
                    {sector.professionals.map(professional => (
                        <Badge key={professional.id} variant="outline" className="text-xs">
                            <User className="mr-2 h-4 w-4" />
                            {professional.name}
                        </Badge>
                    ))}
                </p>
            </CardContent>
            <Separator />
            <CardContent className="flex flex-col space-y-2">
                <h4 className="text-sm font-medium">Pontos de atendimento</h4>
                <p className="text-sm text-muted-foreground flex flex-wrap gap-2">
                    {sector.servicePoints.map(servicePoint => (
                        <Badge key={servicePoint.id} variant="outline" className="text-xs">
                            <MapPin className="mr-2 h-4 w-4" />
                            {servicePoint.name}
                        </Badge>
                    ))}
                </p>
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-col gap-2">
                <Dialog
                    open={isUpsertSectorFormOpen}
                    onOpenChange={setIsUpsertSectorFormOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar setor
                        </Button>
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