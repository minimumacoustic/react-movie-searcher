import {Card, CardBody,} from "@heroui/react";

export function Header() {
    return (
    <Card   className="rounded-none">
      <CardBody
      className='flex justify-center items-center h-[86px] bg-secondary-100'>
        <h1 className='m-0 text-[35px] font-sans '>MovieSearch</h1>
      </CardBody>
    </Card>
    );
}