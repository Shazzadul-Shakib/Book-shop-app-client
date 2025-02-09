import { useNavigate, useParams } from "react-router";
import { useGetSingleProductQuery } from "../../../redux/features/product/productApi";
import ProductDetailsSkeleton from "../../../components/main/skeletons/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data;

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <img
          src={product.image || "/Hero/hero-bg.jpg"}
          alt={product.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-gray-600">Author: {product.author}</p>
        <p className="text-gray-600">Category: {product.category}</p>
        <p className="text-gray-800 font-bold text-xl">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p
          className={
            product.inStock ? "text-green-600 mt-2" : "text-red-600 mt-2"
          }
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full bg-primary text-white py-3 rounded-md transition duration-300"
          disabled={!product.inStock}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
