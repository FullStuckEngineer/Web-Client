import { useState, useEffect } from "react";
import { findOneProduct } from "@/modules/fetch/fetchProduct";

export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await findOneProduct(slug);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, error, loading };
};
