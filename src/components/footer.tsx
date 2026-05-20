export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <img
            src="/logo.png"
            alt="Explat"
            className="block h-7 w-auto self-start object-contain"
          />
          <p className="max-w-md text-sm text-[color:var(--color-fg-muted)]">
            Платёжная инфраструктура для бизнеса: приём и выплаты в локальных
            валютах по всему миру с расчётом в USDT.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-8 sm:max-w-md sm:grid-cols-2 lg:w-auto">
          <FooterCol title="Продукт">
            <FooterLink href="#services">Сервисы</FooterLink>
            <FooterLink href="#features">Возможности</FooterLink>
            <FooterLink href="#security">Безопасность</FooterLink>
          </FooterCol>
          <FooterCol title="Контакты">
            <FooterLink href="https://t.me/explat_COO">Telegram</FooterLink>
          </FooterCol>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-fg-dim)]">
        {title}
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm text-white/70 transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}
