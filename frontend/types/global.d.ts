// Lets TypeScript resolve plain CSS side-effect imports like
// `import "./globals.css"` outside of Next's own build-time type checker
// (e.g. when your editor's TS server or a bare `tsc` run checks the file).
declare module "*.css";
