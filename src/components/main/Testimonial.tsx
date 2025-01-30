import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "I found the perfect book for my weekend read! The collection is amazing, and the delivery was super fast.",
      image: "/Hero/hero-bg.jpg", // Replace with actual customer image
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "This store has the best selection of classics. I’ve been recommending it to all my book-loving friends!",
      image: "/Hero/hero-bg.jpg", // Replace with actual customer image
    },
    {
      id: 3,
      name: "Emily Johnson",
      feedback:
        "The customer service is fantastic. They helped me find a rare book I’ve been searching for years!",
      image: "/Hero/hero-bg.jpg", // Replace with actual customer image
    },
    {
      id: 4,
      name: "Emily Johnson",
      feedback:
        "The customer service is fantastic. They helped me find a rare book I’ve been searching for years!",
      image: "/Hero/hero-bg.jpg", // Replace with actual customer image
    },
    {
      id: 5,
      name: "Emily Johnson",
      feedback:
        "The customer service is fantastic. They helped me find a rare book I’ve been searching for years!",
      image: "/Hero/hero-bg.jpg", // Replace with actual customer image
    },
    {
      id: 6,
      name: "Emily Johnson",
      feedback:
        "The customer service is fantastic. They helped me find a rare book I’ve been searching for years!",
      image: "/Hero/hero-bg.jpg", // Replace with actual customer image
    },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-primary py-16 px-6 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">What Our Readers Say</h2>
        <p className="mt-4 text-lg text-gray-200">
          Hear from our happy customers who found their next favorite book with
          us.
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-4xl slider-container">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="relative rounded-lg bg-white p-8 text-gray-900 shadow-lg flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-primary shadow-md"
                />
                <h4 className="mt-4 text-xl font-semibold text-primary">
                  {testimonial.name}
                </h4>
                <p className="mt-4 text-gray-700 text-center">
                  "{testimonial.feedback}"
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
