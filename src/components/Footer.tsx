function Footer() {
  return (
    <footer
      className="mx-auto flex max-w-5xl flex-col justify-between px-4 py-16 md:flex-row"
      id="contact"
    >
      <div className="flex flex-col justify-between py-4">
        <div className="flex flex-col gap-2">
          <h2 className="mb-4 text-2xl font-semibold">Contato</h2>
          <p className="text-sm">
            Qualquer dúvida, entre em contato pelo WhatsApp
          </p>
          <p> 🇧🇷 +55 (45) 9 9141-3098</p>
          <p>
            <b>Endereço:</b> Av. Morenitas, 752 - Jardim das Flores
            <br />
            Foz do Iguaçu - PR, 85855-190
          </p>
        </div>
        <div>
          <p className="hidden text-start text-xs opacity-80 md:block">
            © {`${new Date().getFullYear()}`} Top Bebidas. Todos os direitos
            reservados. <br />
            Esse site foi desenvolvido por{' '}
            <a
              href="https://konbinicode.com/pt"
              className="animate-pulse text-purple-400"
            >
              Konbini Code
            </a>
          </p>
        </div>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7197.669080597223!2d-54.574638!3d-25.577171!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f69185c795d175%3A0x7f527069053ab3cc!2sAv.%20Morenitas%2C%20752%20-%20Jardim%20das%20Flores%2C%20Foz%20do%20Igua%C3%A7u%20-%20PR%2C%2085855-190!5e0!3m2!1spt-BR!2sbr!4v1733287957103!5m2!1spt-BR!2sbr"
          width="480"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="hidden rounded-xl md:block"
        ></iframe>

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7197.669080597223!2d-54.574638!3d-25.577171!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f69185c795d175%3A0x7f527069053ab3cc!2sAv.%20Morenitas%2C%20752%20-%20Jardim%20das%20Flores%2C%20Foz%20do%20Igua%C3%A7u%20-%20PR%2C%2085855-190!5e0!3m2!1spt-BR!2sbr!4v1733287957103!5m2!1spt-BR!2sbr"
            width="400"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-xl md:hidden"
          ></iframe>
        </div>
      </div>
      <p className="mt-8 text-center text-xs opacity-80 md:hidden md:text-start">
        © {`${new Date().getFullYear()}`} Top Bebidas. Todos os direitos
        reservados. <br />
        Esse site foi desenvolvido por{' '}
        <a
          href="https://konbinicode.com/pt"
          className="animate-pulse text-purple-400"
        >
          Konbini Code
        </a>
      </p>
    </footer>
  )
}

export default Footer
