const AboutUs = () => {
  return (
    <div className="min-h-screen bg-primary py-16 px-6 flex justify-center items-center text-white">
      <div className="p-10  max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">About Us</h1>
        <p className="text-lg leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-white">Book Haven</span>, your
          sanctuary for literary treasures! We offer a curated collection of
          books that inspire, educate, and entertain.
        </p>

        <div className="mt-8">
          <img
            src="/Hero/hero-bg.jpg"
            alt="Bookstore"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-bold text-white mt-8">Our Mission</h2>
        <p className="text-lg mt-3">
          We believe in the transformative power of books. Our mission is to
          bring high-quality literature to readers of all ages and backgrounds,
          cultivating a lifelong love for reading.
        </p>

        <h2 className="text-3xl font-bold text-white mt-8">Why Choose Us?</h2>
        <ul className="text-lg mt-4 text-left list-disc list-inside text-white">
          <li>Expertly curated collection of books</li>
          <li>Exclusive discounts and membership perks</li>
          <li>Personalized recommendations tailored to you</li>
          <li>Fast, reliable, and hassle-free delivery</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-8">Visit Us</h2>
        <p className="text-lg mt-3">
          Drop by our cozy bookstore, grab a cup of coffee, and immerse yourself
          in a world of literary magic. We can't wait to welcome you!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
