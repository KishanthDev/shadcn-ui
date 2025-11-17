import { AlertCircle } from "lucide-react";
import { useFieldValidation, FieldRules } from "./useFieldValidation";
import { TooltipIcon } from "./TooltipIcon";

interface InputBoxProps {
    label?: string;
    name: string;

    value: string;
    onChange: (value: string) => void;

    disabled?: boolean;

    placeholder?: string;
    disabledPlaceholder?: string;

    rules?: FieldRules;
    customError?: string;

    className?: string;
}

export function InputBox({
    label,
    name,
    value,
    onChange,
    disabled = false,

    placeholder = "Enter value",
    disabledPlaceholder = "Select something first",

    rules = {},
    customError,

    className = "",
}: InputBoxProps) {
    const { touched, setTouched, validate } = useFieldValidation(rules);

    const errorMessage = touched ? (validate(value) || customError || "") : "";
    const hasError = Boolean(errorMessage);

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


            {/* RIGHT INPUT FIELD */}
            <div className="flex flex-col w-full">
                <div
                    className={`relative border rounded-md bg-white ${hasError ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    {hasError && (
                        <AlertCircle
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500"
                            size={18}
                        />
                    )}

                    <input
                        type="text"
                        name={name}
                        disabled={disabled}
                        value={value}
                        placeholder={disabled ? disabledPlaceholder : placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={() => setTouched(true)}
                        className={`
              w-full px-3 py-2 rounded-md bg-transparent
              ${hasError ? "pl-8" : ""}
              ${disabled ? "text-gray-400 cursor-not-allowed bg-gray-100" : ""}
            `}
                    />
                </div>

                {/* Error */}
                <div className="h-4 mt-1">
                    {hasError && (
                        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                    )}
                </div>

            </div>
        </div>
    );
}

