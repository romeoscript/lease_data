
"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook that returns true if the current viewport matches the provided media query
 * @param query The media query to check against, e.g. "(max-width: 640px)"
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set the initial value
      setMatches(media.matches);
      
      // Define a callback function to handle changes
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      
      // Add the listener to the media query
      media.addEventListener('change', listener);
      
      // Clean up the listener when the component unmounts
      return () => {
        media.removeEventListener('change', listener);
      };
    }
    
    // Return a no-op cleanup function if window is not available
    return () => {};
  }, [query]);
  
  return matches;
}