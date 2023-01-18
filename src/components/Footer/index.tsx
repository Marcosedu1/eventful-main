import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const links = ["Sobre", "Serviços", "FAQ", "Termos", "Legal", "Contato"];
  return (
    <footer>
      <Box className="flex flex-col justify-center items-center">
        <Box className="mb-4 items-center flex justify-center">
          <Image src="/assets/logo.png" alt="Eventful" width={50} height={50} />
        </Box>
        <ul>
          <Link className="menu justify-center" href={"#"}>
            {links.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </Link>
        </ul>
        <Box className="copyright">
          <p className="mt-3 text-gray-400">
            <small>&copy; ITLab. Todos os direitos reservados.</small>
          </p>
        </Box>
      </Box>
    </footer>
  );
}
