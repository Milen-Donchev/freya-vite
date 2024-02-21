import { useEffect } from 'react';

// A custom hook to disable the browser's back button functionality and maintain URL consistency
export const useDisableBrowserBackButton = () => {
  // Define a popstate event handler
  const popstateHandler = () => {
    // Reset the history state and URL when the popstate event is triggered
    window.history.pushState(null, document.title, window.location.href);
  };
  useEffect(() => {
    // Set the initial history state and URL when the component mounts
    window.history.pushState(null, document.title, window.location.href);

    // Add the popstate event listener
    window.addEventListener('popstate', popstateHandler);

    // Clean up by removing the popstate event listener
    return () => {
      window.removeEventListener('popstate', popstateHandler);
    };
  }, []);

  return {
    popstateHandler // Expose the popstateHandler function for testing purposes
  };
};
