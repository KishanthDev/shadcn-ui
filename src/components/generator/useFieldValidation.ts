import { useState } from "react";

export interface FieldRuleItemNumber {
  value: number;
  message?: string;
}

export interface FieldRuleItemBoolean {
  value: boolean;
  message?: string;
}

export interface FieldRules {
  required?: FieldRuleItemBoolean;
  minLength?: FieldRuleItemNumber;
  maxLength?: FieldRuleItemNumber;
  tooltip?: string; 
}

export function useFieldValidation(rules: FieldRules = {}) {
  const [touched, setTouched] = useState(false);

  const validate = (value: string) => {
    if (!touched) return "";

    // REQUIRED
    if (rules.required?.value && !value.trim()) {
      return rules.required.message || "This field is required";
    }

    // MIN LENGTH
    if (rules.minLength && value.length < rules.minLength.value) {
      return (
        rules.minLength.message ||
        `Minimum ${rules.minLength.value} characters required`
      );
    }

    // MAX LENGTH
    if (rules.maxLength && value.length > rules.maxLength.value) {
      return (
        rules.maxLength.message ||
        `Maximum ${rules.maxLength.value} characters allowed`
      );
    }

    return "";
  };

  return { touched, setTouched, validate };
}
