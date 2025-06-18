"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks"
import { useState } from "react";
import { toast } from "sonner";

import { deleteServicePoint } from "@/actions/delete-service-point";
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
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { sectorsTable, servicePointsTable } from "@/db/schema";

import UpsertServicePointForm from "./upsert-service-point-form";



interface ServicePointCardProps {
    servicePoint: typeof servicePointsTable.$inferSelect;
    sectors: typeof sectorsTable.$inferSelect[];
}

const ServicePointCard = ({ servicePoint, sectors }: ServicePointCardProps) => {

    const [isUpsertSectorFormOpen, setIsUpsertSectorFormOpen] = useState(false);

    const deleteServicePointAction = useAction(deleteServicePoint, {
        onSuccess: () => {
            toast.success("Ponto de atendimento deletado com sucesso!");
        },
        onError: () => {
            toast.error(`Erro ao deletar ponto de atendimento.`);
        },
    });

    const handleDeleteServicePoint = () => {
        if (!servicePoint?.id) {
            toast.error("Ponto de atendimento não encontrado.");
            return;
        }
        deleteServicePointAction.execute({ id: servicePoint?.id || "" });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium">{servicePoint.name} - {sectors.find(sector => sector.id === servicePoint.sectorId)?.name}</h3>
                    <Badge variant="outline" className="text-xs">
                        {servicePoint.availability === "free" ? "Livre" : servicePoint.availability === "busy" ? "Ocupado" : "Indisponível"}
                    </Badge>
                </div>
            </CardHeader>
            <Separator />
            <CardFooter className="flex flex-col gap-2">
                <Dialog
                    open={isUpsertSectorFormOpen}
                    onOpenChange={setIsUpsertSectorFormOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar ponto de atendimento
                        </Button>
                    </DialogTrigger>
                    <UpsertServicePointForm sectors={sectors} servicePoint={{
                        ...servicePoint,
                    }}
                        onSuccess={() => setIsUpsertSectorFormOpen(false)}
                    />
                </Dialog>

                {servicePoint && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full hover:bg-red-500 hover:text-white">
                                <Trash2 />
                                Deletar ponto de atendimento
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza que deseja deletar esse ponto de atendimento?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita. Todos os dados relacionados a esse ponto de atendimento serão perdidos permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteServicePoint}>Deletar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

            </CardFooter>
        </Card>
    );
}

export default ServicePointCard;