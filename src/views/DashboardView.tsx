import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProjects } from "@/api/ProjectApi";

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  if (isLoading) return <p className="text-2xl text-center">Cargando...</p>;

  console.log("data:", data);

  return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y administra tus proyectos
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/projects/create"
        >
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  );
}
