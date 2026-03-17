import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollComponent = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      console.log(element);
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
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [location]);

  return null;
};
