// Define a type for the CSP policy
export type CSPPolicy = {
  'default-src'?: string[];
  'script-src'?: string[];
  'style-src'?: string[];
  'img-src'?: string[];
  'connect-src'?: string[];
  'font-src'?: string[];
  'frame-src'?: string[];
  [key: string]: string[] | undefined; // Allows for other CSP directives
};

// Function to convert a CSP policy object to a policy string
export function generateCSP(policy: CSPPolicy): string {
  return Object.entries(policy)
    .map(([directive, sources]) => {
      return `${directive} ${sources?.join(' ') || ''}`;
    })
    .filter(Boolean) // Remove empty directives
    .join('; ');
}
