import { Card, CardBody, Button, Link } from "@heroui/react";
import { useState } from "react";
import { clsx } from "clsx";

export function Footer() {
  const [isPressed, setIsPressed] = useState(false); //isVisble
  const toggleFooter = () => {
    setIsPressed(!isPressed);
  };

  return (
    <>
      <Card className="rounded-none">
        <CardBody
          className={clsx(
            "fixed w-full flex flex-row items-center bottom-0 justify-around  lg:h-20 bg-secondary-100",
            { invisible: !isPressed, visible: isPressed },
          )}
        >
          <p className="text-xl text-secondary-100 lg:text-white ">by Pash_tet</p>
          <Link
            className="text-xl"
            href="https://github.com/minimumacoustic/"
            underline="hover"
          >
            GitHub
          </Link>
        </CardBody>
      </Card>
      <Button
        className="fixed z-5  bottom-1 lg:bottom-5 lg:right-15"
        onPress={toggleFooter}
      >
        Show/Hide Footer
      </Button>
    </>
  );
}
