import { j as jsxRuntimeExports } from './jsx-runtime-BiUkNPR3.js';
import { C as CircleAlert } from './lucide-react-rz2salZ4.js';
import './index-Cdg8gM5r.js';

const ErrorMessage = ({ error }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-red-900", children: "Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-800 text-sm mt-1", children: error?.message })
    ] })
  ] });
};

export { ErrorMessage as default };
//# sourceMappingURL=ErrorMessage-BqdO90zK.js.map
