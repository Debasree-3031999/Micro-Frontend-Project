// =============================================================
// TYPE DECLARATIONS FOR MODULE FEDERATION REMOTES
// =============================================================
// TypeScript doesn't know about Module Federation remotes by default.
// These declarations tell TypeScript: "Trust me, these modules exist
// and export a default React component."
// Without these, you'd get: Cannot find module 'restaurant/App'
// =============================================================

declare module "restaurant/App" {
  import React from "react";
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "cart/App" {
  import React from "react";
  const Component: React.ComponentType<any>;
  export default Component;
}
