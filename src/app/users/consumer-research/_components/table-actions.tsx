import { EditIcon, MoreVerticalIcon, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

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
import { Dialog } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clientsTable } from "@/db/schema";

import UpsertClientForm from "./upsert-client-form";

interface ClientsTableActionsProps {
    client: typeof clientsTable.$inferSelect;
}

const TableClientActions = ({ client }: ClientsTableActionsProps) => {

    const [upsertDialogIsOpen, setUpsertDialogOpen] = useState(false);
    const [deleteAlertDialogIsOpen, setDeleteAlertDialogOpen] = useState(false);

    return (
        <>
            <Dialog open={upsertDialogIsOpen} onOpenChange={setUpsertDialogOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVerticalIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Ações para {client.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setUpsertDialogOpen(true)}>
                            <EditIcon className="w-4 h-4 mr-2" />
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UpsertClientForm
                    client={client}
                    onSuccess={() => setUpsertDialogOpen(false)}
                />
            </Dialog>
        </>
    );
}

export default TableClientActions;