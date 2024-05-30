import CategoryView from "@/components/views/categories";

const CategoryPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <CategoryView categoryId={id} />
    </div>
  );
};

export default CategoryPage;
