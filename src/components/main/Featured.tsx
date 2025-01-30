import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router";

export const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$50",
      image: "/Hero/hero-bg.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$60",
      image: "/Hero/hero-bg.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$70",
      image: "/Hero/hero-bg.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$80",
      image: "/Hero/hero-bg.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$90",
      image: "/Hero/hero-bg.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$100",
      image: "/Hero/hero-bg.jpg",
    },
  ];

  return (
    <div className="bg-primary py-10 px-6 text-white">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">
        Featured Products
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-[80dvw] mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Optional: Add a "View Details" overlay on hover */}
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
              >
                <span className="text-lg font-semibold text-white">
                  View Details
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {product.name}
            </h3>

            {/* Product Price */}
            <p className="text-lg font-bold text-primary">${product.price}</p>

            {/* Optional: Add a "Add to Cart" button */}
            <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary/90">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
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
