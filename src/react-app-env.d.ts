/// <reference types="react-scripts" />
import { AriaAttributes, DOMAttributes } from "react";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        rel?: string;
        attached?: string;
        minLength?: string;
        name?: string;
    }
};
