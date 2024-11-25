import type React from "react";

export const ErrorMessage = ({
                                 fieldName,
                                 validationErrors,
                             }: {
    fieldName: string;
    validationErrors: Record<string, string>;
}) => {
    return validationErrors[fieldName] ? (
        <div className="error-message text-red-500 text-sm mt-1">
            {validationErrors[fieldName]}
        </div>
    ) : null;
};
