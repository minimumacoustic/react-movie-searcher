import  { useState, useEffect } from 'react';
import { Button } from '@heroui/react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <Button
      onPress={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '123px',
        display: isVisible ? 'block' : 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        fontSize: '18px',
      }}
    >
      Up
    </Button>
  );
};

