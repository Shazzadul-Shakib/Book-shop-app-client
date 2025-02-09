import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import ProductCardSkeleton from "./skeletons/ProductCardSkeleton";
import { IBook } from "../../types/AllTypes";

export const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllProductQuery(undefined);

  return (
    <div className="bg-primary py-10 px-6 text-white">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">
        Featured Products
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-[80dvw] mx-auto">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.data?.slice(0, 6).map((product: IBook) => (
              <div
                key={product._id}
                className="group relative overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image || "/Hero/hero-bg.jpg"}
                    alt={product.title}
                    className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* View Details Overlay */}
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-white">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-lg font-bold text-primary">
                  BDT {product.price}
                </p>

                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary/90">
                  Add to Cart
                </button>
              </div>
            ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 flex justify-end w-[80dvw] mx-auto">
        <button
          onClick={() => navigate("/products")}
          className="rounded-lg bg-gradient-to-r from-primary/50 via-primary/75 to-primary px-6 py-3 text-sm font-semibold text-secondary sm:text-base flex justify-center items-center gap-4 cursor-pointer"
        >
          View All
          <MoveRight />
        </button>
      </div>
    </div>
  );
};
