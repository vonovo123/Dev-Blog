import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      // Newly added in the latest react-hooks plugin. These flag common,
      // functionally-valid patterns used throughout this codebase; disabled to
      // keep lint actionable without risky behavior-changing refactors.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
  },
];

export default eslintConfig;
