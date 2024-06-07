export default function Footer() {
  return(
    <footer className="bg-gray-50 dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Sobre Nós</h4>
            <p className="text-sm font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet metus non elit malesuada vestibulum.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Links</h4>
            <ul className="text-sm font-light">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Sobre</a></li>
              <li><a href="#" className="hover:underline">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contato</h4>
            <p className="text-sm font-light">+55 11 9999-9999</p>
            <p className="text-sm font-light">
              Rua Lorem Ipsum, 1234 - Lorem Ipsum, SP
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">
                Facebook
              </a>
              <a href="#" className="hover:underline">
                Instagram
              </a>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-4 flex justify-between items-center">
          <p className="text-sm font-light">© 2022 Mr. Food. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Termos de Uso</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
