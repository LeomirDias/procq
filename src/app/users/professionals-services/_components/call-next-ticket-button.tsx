import { Button } from "@/components/ui/button"
import { BadgePlus, SmilePlus } from "lucide-react";

const CallNextTicketButton = () => {
    return (
        <Button>
            <BadgePlus className="w-4 h-4" />
            Chamar próximo consumidor
        </Button>
    );
}

export default CallNextTicketButton;