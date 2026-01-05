import Image from "next/image"
import DataTable from "./components/DataTable"

const Page = () => {
  return <main className="main-container">
    <section className="home-grid">
      <div id="coin-overview">
        <div className="header">
          <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" width={56} height={56} />
          <div className="info">
            <p>BitCoin / BTC</p>
            <h1>$90,470.23</h1>
          </div>
        </div>
      </div>

      <p>Trending Coins</p>
      <DataTable />
    </section>

    <section className="w-full mt-7 space-y-4">
      <p>Categories</p>
    </section>
  </main>
}

export default Page