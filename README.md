<div align="center">
  <br />
    <img src="public/readme/module-logo.webp" alt="Project Banner" width="400" />
  <br />

  <div>
<img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=Next.js&logoColor=white" />
<img src="https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
<img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/-shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
<img src="https://img.shields.io/badge/-CoinGecko-06D6A0?style=for-the-badge&logo=coingecko&logoColor=white" />
<img src="https://img.shields.io/badge/-CodeRabbit-FF6B6B?style=for-the-badge&logo=coderabbit&logoColor=white" />


  </div>

  <h3 align="center">CoinPulse — Analytics Dashboard</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

CoinPulse is an analytics dashboard built with Next.js 16, TypeScript, TailwindCSS v4, and shadcn/ui. It pulls market data from CoinGecko’s REST API, renders interactive candlestick charts, and includes a global search modal for fast navigation to coin detail pages.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js](https://nextjs.org)** is a powerful React framework for building full-stack web applications. It simplifies development with features like server-side rendering, static site generation, and API routes, enabling developers to focus on building products and shipping quickly.

- **[TypeScript](https://www.typescriptlang.org/)** is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers. It is ideal for building large-scale applications and enhances the development experience.

- **[Tailwind CSS](https://tailwindcss.com/)** is a utility-first CSS framework that allows developers to rapidly build modern websites by composing styles directly in their HTML markup, which facilitates highly customized designs and ensures the smallest possible production CSS bundles.

- **[Shadcn/ui](https://ui.shadcn.com/docs)** is a collection of beautifully-designed, accessible React components that you copy and paste directly into your project (it is not a traditional npm library), giving you full source code ownership and total customization control to build your own design system often utilizing Tailwind CSS.

- **[CoinGecko API](https://www.coingecko.com/)** is a comprehensive and reliable RESTful API that provides real-time and historical cryptocurrency market data, including prices, market capitalization, volume, and exchange information, enabling developers to build crypto tracking, analysis, and portfolio management applications.

- **[TradingView](https://www.tradingview.com/lightweight-charts/)** is a high-performance financial visualization library that provides interactive charting capabilities for rendering complex OHLCV data. It enables the integration of responsive candlestick charts and technical indicators, allowing users to perform professional-grade technical analysis with low-latency updates and surgical precision.

## <a name="features">🔋 Features</a>

👉 **Home Dashboard**: Displays crucial market health indicators like **Total Market Cap** and **BTC & ETH dominance**, alongside a dynamic list of **Trending Tokens**, all retrieved instantly using the CoinGecko `/global` and `/search/trending` endpoints.

👉 **Token Discovery Page**: A comprehensive, sortable and searchable table featuring key token metrics (Price, 24h change, Market Cap Rank) for mass market analysis, powered by the scalable `/coins/markets` REST API and optimized with pagination for efficient browsing.

👉 **Detailed Coin Page**: Summary view for any selected coin (price, market cap rank, links) using the `/coins/{id}` REST API.

👉 **Interactive Candlestick Chart**: TradingView Lightweight Charts with multiple time ranges powered by `/coins/{id}/ohlc`.

👉 **Optional Live Streaming (Paid plan)**: If you have access to CoinGecko WebSocket (paid plan), the UI can stream live updates. Onchain trades are available only for assets with an on-chain pool.

👉 **Smart Currency Converter**: Converts a coin amount across available quote currencies based on the coin’s `market_data.current_price`.

👉 **Global Search Functionality**: A powerful, unified search bar that allows users to quickly locate any crypto asset by name or symbol, linking directly to the respective Token Detail Page via the CoinGecko `/search` and `/coins/{id}` REST endpoints.

And many more, including code architecture and reusability.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/davidldv/coinpulse.git
cd coinpulse
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Copy `.env.example` to `.env.local` and fill in your key:

```bash
cp .env.example .env.local
```

Notes:
- `COINGECKO_BASE_URL` defaults to the Demo API base URL.
- CoinGecko WebSocket is paid-plan only. If you don’t have access, leave the `NEXT_PUBLIC_...` vars empty and the app will gracefully fall back to REST-only mode.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


