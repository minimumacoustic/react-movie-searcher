import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { clsx } from "clsx";
import { useThrottle } from "../../../../customhooks";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useThrottle(() => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, 400);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onPress={scrollToTop}
      className={clsx(
        "fixed lg:bottom-20 bottom-13 lg:right-31 z-1 rounded-md text-lg",
        { block: isVisible, hidden: !isVisible },
      )}
    >
      Up
    </Button>
  );
}
