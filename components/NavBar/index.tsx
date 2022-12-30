import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";

export default function NavBar() {
  const router = useRouter();

  const routes = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Eventos",
      to: "/eventos",
    },
    {
      label: "Organize",
      to: "/organize",
    },
  ];

  const handleLogin = () => {
    router.push("/usuario/login");
  };

  return (
    <nav>
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src="/assets/logo.png"
            alt="Eventful"
            width={50}
            height={50}
            className="mr-10"
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
      <Button title="Entrar" onClick={handleLogin} size="sm" color="dark" />
    </nav>
  );
}
