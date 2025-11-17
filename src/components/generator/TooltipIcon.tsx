import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function TooltipIcon({ message }: { message: string }) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer">
        <Info size={16} className="text-gray-500 hover:text-black" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}
