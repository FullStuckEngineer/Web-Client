import ProductView from "@/components/views/products";

const ProductPage = ({ params }) => {
  const { slug } = params;
  return (
<div className="md:py-14 py-24 md:px-28 px-0 bg-color-secondary w-full">
  <ProductView slug={slug} />

</div>
  ) 
};

export default ProductPage;
