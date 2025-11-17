import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertCircle } from "lucide-react";
import { FieldRules, useFieldValidation } from "./useFieldValidation";
import { TooltipIcon } from "./TooltipIcon";

interface DropdownOption {
    label: string;
    value: string;
}

interface FormDropdownProps {
    label?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    options: DropdownOption[];
    error?: string;
    showError?: boolean;
    rules?: FieldRules;
    className?: string; // <-- user can control width
}

export function FormDropdown({
    label,
    name,
    placeholder = "Select an option",
    required = false,
    value,
    onChange,
    options,
    rules={},
    error,
    showError = false,
    className = "",
}: FormDropdownProps) {
    
    const hasError = required && !value && showError;

    return (
        <div className={`flex items-start gap-3 ${className}`}>

            {/* LEFT LABEL */}
            {label && (
                <label className="w-32 text-sm font-medium flex items-center gap-1 pt-2">
                    {label}

                    {/* Tooltip icon */}
                    {rules.tooltip && (
                        <TooltipIcon message={rules.tooltip} />
                    )}
                </label>
            )}


            {/* RIGHT DROPDOWN */}
            <div className="flex flex-col w-full">

                {/* Hidden required field */}
                <input type="hidden" name={name} value={value} required={required} />

                <div
                    className={`relative border rounded-md bg-white ${hasError ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    {/* Warning icon */}
                    {hasError && (
                        <AlertCircle
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500"
                            size={18}
                        />
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={`
                px-3 py-2 w-full text-left rounded-md bg-transparent
                ${hasError ? "pl-8" : ""}
              `}
                        >
                            {value || (
                                <span className="text-gray-400">{placeholder}</span>
                            )}
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="min-w-[var(--radix-dropdown-menu-trigger-width)] w-full"
                        >
                            {options.map((opt) => (
                                <DropdownMenuItem
                                    key={opt.value}
                                    onClick={() => onChange(opt.value)}
                                    className="cursor-pointer"
                                >
                                    {opt.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Error */}
                <div className="h-4 mt-1">
                    {hasError && (
                        <p className="text-red-500 text-xs mt-1">
                            {error || "This field is required"}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}

