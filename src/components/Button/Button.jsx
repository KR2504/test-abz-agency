import React from "react";

export default function Button({onClick, children, disabled = false, classModificator = ''}) {
    return (
        <button
            onClick={onClick}
            className={`button ${classModificator}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

