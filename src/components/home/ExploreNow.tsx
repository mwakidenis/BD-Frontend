import Image from "next/image";
import Link from "next/link";
import image from "../../assets/imageOne.jpg"; // Replace with a relevant SoptokBD image

const ExploreNow = () => {
  return (
    <div className="bgImage bg-fixed bg-teal-900 text-white py-16 my-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <Image
            className="w-full max-w-[350px] mx-auto"
            src={image}
            alt="SoptokBD Event"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 bg-black/45 p-4">
          <h2 className="uppercase text-3xl lg:text-4xl font-bold mb-4 text-white">
            Explore our collections
          </h2>
          <p className="text-gray-100 mb-6 leading-relaxed">
            Are you an artisan, designer, or craft enthusiast? Share your
            handmade collections, host a workshop, or feature your products on
            SoptokBD. Inspire others and connect with a community that values
            creativity and tradition.
          </p>
          <Link href="/signup">
            <button className="hover:cursor-pointer px-6 py-2 font-medium transition-all duration-300 hover:bg-gray-400 bg-white text-black shadow-md">
              Register now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreNow;
