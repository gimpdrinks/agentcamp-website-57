
import { useEffect, useRef, useState } from 'react';

export const useAnimateOnScroll = <T extends HTMLElement>(): [
  React.RefObject<T>,
  string,
  boolean
] => {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection observed:', {
            target: entry.target.className,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio
          });
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setIsVisible(true);
            if (!hasBeenVisible) {
              setHasBeenVisible(true);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasBeenVisible]);

  const animationClasses = isVisible 
    ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-700' 
    : 'opacity-0 translate-y-4';

  return [elementRef, animationClasses, hasBeenVisible];
};
