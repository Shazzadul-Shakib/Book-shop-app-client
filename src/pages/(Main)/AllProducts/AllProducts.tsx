import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetAllProductQuery } from "../../../redux/features/product/productApi";
import ProductCardSkeleton from "../../../components/main/skeletons/ProductCardSkeleton";
import { IBook } from "../../../types/AllTypes";
import { useAppDispatch } from "../../../redux/hooks";
import { addItem } from "../../../redux/features/product/productCartSlice";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // State for search, filters, and sorting
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Debounced search input to prevent excessive API calls
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Construct query params dynamically
  const queryParams: Record<string, string> = {};
  if (debouncedSearch) queryParams.search = debouncedSearch;
  if (category) queryParams.category = category;
  if (author) queryParams.author = author;
  queryParams.sortBy = "price";
  queryParams.sortOrder = sortOrder;

  // Fetch data with filters & sorting
  const { data, isLoading } = useGetAllProductQuery(queryParams);

  // Extract unique authors from the filtered books
  const uniqueAuthors = Array.from(
    new Set(data?.data?.map((book: IBook) => book.author) || [])
  );

  return (
    <div className="p-10 bg-primary min-h-screen text-white">
      {/* Search & Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title, author, or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg w-full sm:w-1/3 text-xs text-white border border-gray-300 bg-primary focus:outline-none focus:ring-0 focus:border-gray-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg w-full sm:w-1/5 text-xs text-white border border-gray-300 bg-primary focus:outline-none focus:ring-0 focus:border-gray-400"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="SelfDevelopment">Self-Development</option>
          <option value="Poetry">Poetry</option>
          <option value="Religious">Religious</option>
        </select>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-3 rounded-lg w-full sm:w-1/5 text-xs text-white border border-gray-300 bg-primary focus:outline-none focus:ring-0 focus:border-gray-400"
        >
          <option value="">All Authors</option>
          {uniqueAuthors.length > 0 ? (
            (uniqueAuthors as string[]).map((author: string) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))
          ) : (
            <option disabled>No Authors Available</option>
          )}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 rounded-lg w-full sm:w-1/5 text-xs text-white border border-gray-300 bg-primary focus:outline-none focus:ring-0 focus:border-gray-400"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
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
                  onClick={() =>
                    dispatch(addItem({ ...product, cartQuantity: 1 }))
                  }
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
