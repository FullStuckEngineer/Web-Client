import CardProduct from "@/components/ui/CardProduct";
import { findProductBySearch } from "@/modules/fetch/fetchProduct";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodeKeyword = decodeURI(keyword);

  let products = [];

  try {
    products = await findProductBySearch(decodeKeyword);
  } catch (error) {
    console.error("Error fetching products:", error);
    products = { data: { products: [] } };
  }

  return (
    <div>
      <section>
        <div>{`Pencarian untuk ${decodeKeyword}...`}</div>
        <CardProduct products={products} />
      </section>
    </div>
  );
};

export default Page;
