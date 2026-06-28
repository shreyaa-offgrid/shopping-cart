//re export everything from one place
export * from "@testing-library/react";
//override render with custom version
export {renderWithProviders as render} from "./renderWithProviders";