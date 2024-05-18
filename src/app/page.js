import { CardProduct } from "@/components/ui/CardProduct";
import { Hero, Footer, Lastest, Popular } from "@/components/layouts";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <title>BabyBoo</title>
      <main >
        <div >
          <ul>
            <li >
              <Hero />
            </li>
          </ul>

        </div>
      </main>

      <Popular />
      <Lastest />
      <Footer />
    </div>
  );
}
