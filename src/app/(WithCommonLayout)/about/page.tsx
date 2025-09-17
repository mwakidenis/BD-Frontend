import React from "react";
import { ShoppingBag, Users, Award, Truck, Shield, Heart } from "lucide-react";

export default function AboutUs() {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Categories" },
    { number: "5+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      title: "Quality Assurance",
      description:
        "We ensure every product meets our high standards of quality and authenticity.",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery across Bangladesh with careful packaging.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure Shopping",
      description:
        "Safe and secure payment methods with buyer protection guarantee.",
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "Customer Care",
      description: "Dedicated customer support team ready to help you 24/7.",
    },
  ];

  const team = [
    {
      name: "Mohammad Rahman",
      position: "Founder & CEO",
      image: "/api/placeholder/150/150",
      description:
        "Passionate about bringing authentic Bangladeshi products to every home.",
    },
    {
      name: "Fatima Khatun",
      position: "Product Manager",
      image: "/api/placeholder/150/150",
      description: "Expert in traditional crafts and quality assurance.",
    },
    {
      name: "Abdul Karim",
      position: "Operations Head",
      image: "/api/placeholder/150/150",
      description:
        "Ensures smooth operations and timely deliveries nationwide.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About SoptokBD
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Your trusted partner for authentic Bangladeshi products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded with a vision to preserve and promote the rich cultural
              heritage of Bangladesh, SoptokBD has been connecting customers
              with authentic traditional products since our inception.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              From exquisite handwoven sarees to traditional handicrafts, we
              curate the finest products that represent the artistic excellence
              of Bangladeshi artisans and craftspeople.
            </p>
            <p className="text-lg text-gray-600">
              Our commitment goes beyond business – we're dedicated to
              supporting local artisans and preserving traditional craftsmanship
              for future generations.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600">
              To make authentic Bangladeshi products accessible to everyone
              while supporting local artisans and preserving our cultural
              heritage through quality craftsmanship.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600">
              To be Bangladesh's leading platform for traditional products,
              connecting global customers with the finest handcrafted items and
              cultural treasures.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-gray-500" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-6 opacity-90">
            Discover the beauty of Bangladeshi craftsmanship and be part of our
            story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            Thank you for choosing SoptokBD. Together, we're preserving
            traditions and creating memories.
          </p>
        </div>
      </div>
    </div>
  );
}
