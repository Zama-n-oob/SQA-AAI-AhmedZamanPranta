import { j as jsxRuntimeExports } from './jsx-runtime-BiUkNPR3.js';
import { S as Search } from './lucide-react-rz2salZ4.js';
import { r as reactExports } from './index-Cdg8gM5r.js';

const SearchBar = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = reactExports.useState("");
  const handleSearch = () => {
    onSearch(inputValue);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-6 rounded-xl shadow-md border border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "search",
          onChange: (e) => setInputValue(e.target.value),
          value: inputValue,
          onKeyUp: (e) => e.key === "Enter" && handleSearch(),
          placeholder: "Search for legal documents...",
          className: "w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleSearch,
        disabled: isLoading || !inputValue,
        className: "px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm",
        children: "Search"
      }
    )
  ] }) });
};

export { SearchBar as default };
//# sourceMappingURL=SearchBar-DoRYoSt8.js.map
