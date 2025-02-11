import { useNavigate } from "react-router";
import { useGetAllProductQuery } from "../../../redux/features/product/productApi";
import ProductCardSkeleton from "../../../components/main/skeletons/ProductCardSkeleton";
import { IBook } from "../../../types/AllTypes";
import { useAppDispatch } from "../../../redux/hooks";
import { addItem } from "../../../redux/features/product/productCartSlice";

const AllProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllProductQuery(undefined);
  const dispatch = useAppDispatch();

  return (
    <div className="p-10 bg-primary min-h-screen text-white">
      {/* Search & Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title, author, or category"
          className="p-3 rounded-lg w-full sm:w-1/3 text-xs text-white border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400"
        />
        <select className="p-3 rounded-lg w-full sm:w-1/5 text-xs text-white border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 appearance-none pr-8 bg-primary">
          <option>All Categories</option>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Mystery</option>
          <option>Sci-Fi</option>
          <option>Biography</option>
        </select>
        <select className="p-3 rounded-lg w-full sm:w-1/5 text-xs text-white border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 appearance-none pr-8 bg-primary">
          <option>All Authors</option>
          <option>Author A</option>
          <option>Author B</option>
        </select>
        <select className="p-3 rounded-lg w-full sm:w-1/5 text-xs text-white border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 appearance-none pr-8 bg-primary">
          <option>Price Range</option>
          <option>Below $50</option>
          <option>$50 - $100</option>
          <option>Above $100</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.data?.map((product: IBook) => (
              <div
                key={product._id}
                className="group relative overflow-hidden rounded-lg bg-white p-4 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image || "/Hero/hero-bg.jpg"}
                    alt={product.title}
                    className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-white">
                      View Details
                    </span>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-lg font-bold text-primary">
                  BDT: {product.price}
                </p>
                <p className="text-lg text-gray-700">
                  Author: {product.author}
                </p>
                <p className="text-gray-700">Category: {product.category}</p>
                <p
                  className={
                    product.inStock
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>

                <button
                  disabled={!product.inStock}
                  onClick={() => dispatch(addItem({ ...product, cartQuantity: 1 }))}
                  className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 
    ${
      product.inStock
        ? "bg-primary hover:bg-primary/90 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }`}
                >
                  Add to Cart
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllProducts;
