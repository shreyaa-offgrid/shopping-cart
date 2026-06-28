import { createContext } from "react";

const SearchContext = createContext({
    searchQuery: "",
    setSearchQuery: () => { },
    searchInput: "",
    setSearchInput: () => { }
});

export default SearchContext;