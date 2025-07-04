import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react";

const FinishServiceButton = () => {
    return (
        <Button>
            <BadgeCheck className="w-4 h-4" />
            Finalizar atendimento
        </Button>
    );
}

export default FinishServiceButton;