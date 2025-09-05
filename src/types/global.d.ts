import 'react';

declare module 'react' {
  interface InputHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends the HTML input element's attributes
    webkitdirectory?: string | boolean;
    directory?: string | boolean;
  }
}
