import { FeaturedProducts } from "../../../components/main/Featured";
import Hero from "../../../components/main/Hero";
import { Testimonials } from "../../../components/main/Testimonial";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Testimonials/>
    </>
  );
};

export default Home;
