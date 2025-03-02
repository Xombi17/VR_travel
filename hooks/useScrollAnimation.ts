import { useState, useEffect } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Initial values
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isElementInView = (elementTop: number, elementHeight: number) => {
    if (typeof elementTop !== 'number' || typeof elementHeight !== 'number') {
      return 0;
    }

    const viewBottom = scrollY + windowHeight;
    const viewTop = scrollY;
    
    // Calculate how far the element is from entering/leaving the viewport
    const distanceFromBottom = (elementTop + elementHeight) - viewTop;
    const distanceFromTop = viewBottom - elementTop;
    
    // Calculate blur based on element position
    if (distanceFromTop > 0 && distanceFromBottom > 0) {
      // Element is in view, calculate blur based on position
      const progress = Math.min(distanceFromTop / windowHeight, 1);
      return Math.max(0, Math.min(1, 1 - progress)); // Ensure value is between 0 and 1
    }
    return 0; // No blur when element is not in view
  };

  return { scrollY, windowHeight, isElementInView };
}
