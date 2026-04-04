import { j as jsxRuntimeExports } from './jsx-runtime-BiUkNPR3.js';
import { Q as QueryClient, a as QueryClientProvider } from './index-CdSqQBxY.js';
import './index-Cdg8gM5r.js';

function TestProviders({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children });
}

export { TestProviders as default };
//# sourceMappingURL=TestProviders-j9uGNeNt.js.map
