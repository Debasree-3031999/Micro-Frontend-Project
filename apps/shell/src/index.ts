// =============================================================
// ASYNC ENTRY POINT — CRITICAL FOR MODULE FEDERATION
// =============================================================
// This file MUST only contain this dynamic import. Nothing else.
//
// WHY? Module Federation needs to negotiate shared dependencies
// (like React) BEFORE any React code runs. This async boundary
// gives Webpack time to:
// 1. Check what shared deps are available from remotes
// 2. Decide which version of React to use (host's or remote's)
// 3. Load the chosen version
// 4. THEN run bootstrap.tsx which actually renders the app
//
// Without this, you'll get the error:
// "Shared module is not available for eager consumption"
// =============================================================
import("./bootstrap");
