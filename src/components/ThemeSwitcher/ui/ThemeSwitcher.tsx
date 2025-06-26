import { useTheme } from "@heroui/use-theme";
import { Switch } from "@heroui/react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useThrottle } from "../../../shared/customhooks";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [hasScrolled, setHasScrolled] = useState(false);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleScroll = useThrottle(() => {
    if (window.scrollY > 30) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  }, 150);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Switch
      classNames={{
        label: "lg:block hidden",
      }}
      className={clsx(
        "fixed  transition-top duration-200 ease-in-out lg:right-13",
        { "top-1": hasScrolled, "lg:top-24 top-34": !hasScrolled },
      )}
      onChange={switchTheme}
      defaultSelected
      color="secondary"
      size="lg"
      thumbIcon={({ className }) =>
        theme === "dark" ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    >
      Dark mode
    </Switch>
  );
}
