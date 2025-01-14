import Image from "next/image";

export default function App() {
  return (
    <div className="flex bg-secondary">
      <div className="w-[205px] min-h-screen bg-background ">
        <div className="logo flex content-center p-7 gap-3">
          <div className="content-center">
            <Image alt="logo" src={`/img/logo.svg`} width={36} height={29} />
          </div>
          <div className="content-center">
            <div className="text-foreground">NomNom</div>
            <div className="text-muted-foreground">Swift devivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
