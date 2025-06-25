export function ErrorMessage({ messa }: { messa: string }) {
  return (
    <>
      <h1 className={"pl-215 pt-20  text-red-500 text-5xl"}>{messa}</h1>
    </>
  );
}
