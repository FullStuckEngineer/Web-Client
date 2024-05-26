import { CardProduct } from "@/components/ui/CardProduct";
import { Hero, Footer, Lastest, Popular } from "@/components/layouts";

import CardProduct from "@/components/ui/CardProduct/index";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const listProducts = await findAllProduct();
        setProducts(listProducts); 
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, []);
  
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

export default HomePage
