import {Card, CardBody, Button, Link} from "@heroui/react";
import { useState, } from 'react';


export function Footer() {
    const [isPressed, setIsPressed] = useState(false)
    const showFooter = () => {
        setIsPressed(!isPressed)
    }


    return (
    <>
    <Card   className="rounded-none">
      <CardBody
      className={' fixed w-full flex flex-row items-center bottom-0 justify-around  h-[80px] bg-secondary-100'}
      style={{
        visibility: isPressed ? 'visible' : 'hidden',
      }}
      >
        <p className="text-xl">by Pash_tet</p>
        <Link className="text-xl" href='https://github.com/minimumacoustic/' underline="hover" >GitHub</Link>
      </CardBody>
    </Card>
    <Button 
    className="fixed z-5   bottom-5 right-[60px]"
    onPress={showFooter}>Show/Hide Footer
    </Button>   
    </>
    );
}
