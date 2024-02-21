import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const ALIASES = [
  "components",
  "styleguide",
  "utils",
  "pages",
  "models",
  "hooks",
  "types",
  "providers",
  "store",
];

const mapAliasesToPaths = () =>
  ALIASES.map((alias) => ({
    find: `@${alias}`,
    replacement: path.resolve(__dirname, "src", alias),
  }));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: [{ find: "@freya", replacement: `/src` }, ...mapAliasesToPaths()],
  },
});
