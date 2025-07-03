import { Button } from "@/components/ui/button"
import { SmilePlus } from "lucide-react";

const CallNextTicketButton = () => {
    return (
        <Button>
            <SmilePlus />
            Chamar próximo atendimento
        </Button>
    );
}

export default CallNextTicketButton;