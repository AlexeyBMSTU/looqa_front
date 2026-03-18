import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = location.hash || window.location.hash;

      if (hash) {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);

        if (element) {
          const navbarElement = document.querySelector('[class*="Navbar"]');

          const getNavbarHeight = () => {
            if (navbarElement) {
              return navbarElement.getBoundingClientRect().height;
            } else {
              const tempDiv = document.createElement('div');
              tempDiv.style.height = '4em';
              tempDiv.style.position = 'absolute';
              tempDiv.style.visibility = 'hidden';
              document.body.appendChild(tempDiv);
              const height = tempDiv.getBoundingClientRect().height;
              document.body.removeChild(tempDiv);
              return height;
            }
          };

          const navbarHeight = getNavbarHeight();
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const scrollTop = elementPosition - navbarHeight;

          window.scrollTo({
            top: scrollTop,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    };

    scrollToHash();

    const timeouts = [125];
    timeouts.forEach(timeout => {
      setTimeout(scrollToHash, timeout);
    });

    window.addEventListener('load', scrollToHash);

    return () => {
      window.removeEventListener('load', scrollToHash);
    };
  }, [location]);

  return null;
};
