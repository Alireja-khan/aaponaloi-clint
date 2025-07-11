import { useEffect } from 'react';
import { useLocation } from 'react-router';

let scrollCallback = null;

export const triggerScrollToTop = () => {
  if (scrollCallback) scrollCallback();
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Expose function for external trigger
  scrollCallback = scrollToTop;

  return null;
};

export default ScrollToTop;
