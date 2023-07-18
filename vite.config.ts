import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Mock-Technical-Test-Junior-Web",
  plugins: [react()],
});
