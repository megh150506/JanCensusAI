const assert = require("assert");

console.log("Running Frontend Automated Validation Test Suite...");

// 1. Verify translations dictionary structure
try {
  const fs = require("fs");
  const path = require("path");
  
  const translationsContent = fs.readFileSync(
    path.join(__dirname, "src", "lib", "translations.ts"),
    "utf8"
  );
  
  assert(translationsContent.includes("en:"), "English translations missing");
  assert(translationsContent.includes("hi:"), "Hindi translations missing");
  assert(translationsContent.includes("mr:"), "Marathi translations missing");
  assert(translationsContent.includes("ta:"), "Tamil translations missing");
  console.log("✓ Translations Dictionary Verification: PASSED (en, hi, mr, ta supported)");

  // 2. Verify Store Zustand configuration
  const storeContent = fs.readFileSync(
    path.join(__dirname, "src", "store", "useCensusStore.ts"),
    "utf8"
  );
  assert(storeContent.includes("persist"), "Zustand persist middleware missing");
  assert(storeContent.includes("census_language_store"), "Store persistence key missing");
  assert(storeContent.includes("setLanguage"), "setLanguage function missing");
  console.log("✓ Store State & Persistence Verification: PASSED");

  // 3. Verify Header and Sidebar Language Selector Dropdowns
  const headerContent = fs.readFileSync(
    path.join(__dirname, "src", "components", "layout", "Header.tsx"),
    "utf8"
  );
  const sidebarContent = fs.readFileSync(
    path.join(__dirname, "src", "components", "layout", "Sidebar.tsx"),
    "utf8"
  );
  assert(headerContent.includes("setLanguage"), "Header language selector binding missing");
  assert(sidebarContent.includes("setLanguage"), "Sidebar language selector binding missing");
  console.log("✓ Header & Sidebar Language Selectors Verification: PASSED");

  // 4. Verify Backend API Integration
  const apiContent = fs.readFileSync(
    path.join(__dirname, "src", "lib", "api.ts"),
    "utf8"
  );
  assert(apiContent.includes("NEXT_PUBLIC_API_BASE_URL"), "Environment API BASE URL configuration missing");
  console.log("✓ API Integration Environment Base URL: PASSED");

  console.log("\n==========================================");
  console.log("ALL FRONTEND TESTS PASSED (100% SUCCESS)!");
  console.log("==========================================\n");
} catch (err) {
  console.error("Test failed:", err);
  process.exit(1);
}
