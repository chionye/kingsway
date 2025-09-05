/** @format */

import { useState, useEffect } from "react";

export function useMediaQuery(query: any) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window and matchMedia are available (for server-side rendering)
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQueryList = window.matchMedia(query);

      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

      // Set the initial state
      setMatches(mediaQueryList.matches);

      // Add the listener for future changes
      mediaQueryList.addEventListener("change", listener);

      // Clean up the listener when the component unmounts
      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    }
  }, [query]); // Re-run effect if the query string changes

  return matches;
}
