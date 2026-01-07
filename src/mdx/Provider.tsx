import { MDXProvider } from '@mdx-js/react';
import CTA from '@qially/ui-react/CTA';
import PricingTable from '@qially/ui-react/PricingTable';
// Add more shared UI components as needed

const components = {
  CTA,
  PricingTable,
  // Add more components here as you need them in MDX
};

export const WithMDX: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

