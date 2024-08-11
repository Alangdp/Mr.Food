export default function NotFound() {
  return (
    <div className="bg-gray-100">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-secondary">404</h1>
        <p className="text-4xl font-medium text-secondary">
          Página não encontrado
        </p>
        <a
          href="/"
          className="mt-4 text-xl text-red-600 hover:underline font-medium"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
