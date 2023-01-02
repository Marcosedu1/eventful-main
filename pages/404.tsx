import { useRouter } from "next/router";
import BaseHeader from "../src/components/BaseHeader";
import Button from "../src/components/Button";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <BaseHeader title="404" />

      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="m-0 bg-[url('/assets/bg.jpg')] bg-no-repeat bg-cover bg-center bg-clip-text translate-x-0.5 text-[220px] font-bold text-transparent">
            Oops!
          </h1>
        </div>
        <h2 className="text-2xl font-bold uppercase mb-5">
          404 - Página não encontrada
        </h2>
        <Button title="< Retornar" size="md" onClick={() => router.back()} />
      </div>
    </>
  );
}
