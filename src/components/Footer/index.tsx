import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const links = ["Sobre", "Serviços", "FAQ", "Termos", "Legal", "Contato"];
  return (
    <footer>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 text-center">
            <div className="mb-4 items-center flex justify-center">
              <Image
                src="/assets/logo.png"
                alt="Eventful"
                width={50}
                height={50}
              />
            </div>
            <ul>
              <Link className="menu justify-center" href={"#"}>
                {links.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </Link>
            </ul>
            <div className="copyright">
              <p className="mt-3 text-gray-400">
                <small>&copy; ITLab. Todos os direitos reservados.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
