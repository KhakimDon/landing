# landing

Лендинг **explat.io** — процессинговая инфраструктура нового поколения.

## Стек

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide icons

## Команды

```bash
npm install     # установить зависимости
npm run dev     # dev-сервер на http://localhost:5173
npm run build   # production-билд в dist/
npm run preview # посмотреть production-билд локально
```

## Структура

```
src/
├── App.tsx                      # композиция секций
├── main.tsx                     # entrypoint
├── index.css                    # Tailwind + кастомные animations
├── lib/cn.ts                    # cn(...) helper
└── components/
    ├── navbar.tsx               # sticky-navbar с blur и моб-меню
    ├── scroll-progress.tsx      # 1px-индикатор скролла
    ├── hero.tsx                 # split-layout: текст + сова с орбитами
    ├── stats.tsx                # 4 счётчика с count-up анимацией
    ├── services.tsx             # 11 методов оплаты в сетке
    ├── geo.tsx                  # dotted-карта мира + 7 стран
    ├── features.tsx             # 8 карточек возможностей
    ├── banks-marquee.tsx        # бесконечная лента банков
    ├── security.tsx             # 4 пункта безопасности
    ├── comparison.tsx           # vs Банк vs SWIFT (table → cards mobile)
    ├── faq.tsx                  # 8 вопросов в accordion
    ├── cta.tsx                  # «Запросить интеграцию»
    └── footer.tsx               # ссылки + контакты
```

## Деплой

`npm run build` → папка `dist/` → залить на любой статик-хостинг (Vercel /
Netlify / nginx). Для домена `explat.io` достаточно nginx-конфига как у
сестринских поддоменов (`panel.explat.io`, `merchant.explat.io`).
