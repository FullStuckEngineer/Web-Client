import { useState, useEffect } from "react";
import { findOneProduct } from "@/modules/fetch/fetchProduct";

export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await findOneProduct(slug);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 console.log(product);

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};
