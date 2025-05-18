export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 border-b-4 border-green-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 relative mr-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VbuxDISshPfQUme4cBJ48n7IGhRlm0.png"
              alt="Logo UNESUM"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-green-700 text-xl font-bold">Universidad Estatal del Sur de Manabí</h1>
            <p className="text-red-600 text-sm">Sistema de Distribución de Carga Horaria Docente</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-green-700 font-semibold">Período Académico 2025 (P1)</p>
          <p className="text-red-600 text-sm">Facultad de Ciencias Técnicas</p>
        </div>
      </div>
    </header>
  )
}
