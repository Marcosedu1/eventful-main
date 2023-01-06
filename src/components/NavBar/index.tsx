import Image from "next/image";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import Button from "../Button";

export default function NavBar() {

  const { isLogged } = useApp()

  const routes = [
    {
      label: "Eventos",
      to: "/",
    },
    {
      label: "Organize",
      to: "/organize",
    },
  ];

  return (
    <nav>
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src="/assets/logo.png"
            alt="Eventful"
            width={50}
            height={50}
          />
        </Link>

        <ul className="menu">
          {routes.map((route, index) => (
            <li key={index} className="text-lg font-bold">
              <Link href={route.to}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {!isLogged && <Link href={"/usuario/login"}>
        <Button title="Entrar" size="sm" color="dark" />
      </Link>}
    </nav>
  );
}
