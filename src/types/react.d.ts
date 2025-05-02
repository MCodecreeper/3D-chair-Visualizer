import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Extend this interface to allow any custom data attributes
    [key: `data-${string}`]: string | undefined;
    // Allow aria attributes
    [key: `aria-${string}`]: string | undefined;
  }
} 