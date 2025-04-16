const About = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#FF6154] mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          Welcome to our website! We are passionate about delivering the best
          technology solutions to our customers. Our team is dedicated to
          innovation and excellence.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-12 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-[#FF6154] mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to empower businesses and individuals with cutting-edge
          technology solutions that drive success and innovation.
        </p>
      </section>

      {/* Team Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-12 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-[#FF6154] mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#FF6154] text-white flex items-center justify-center font-bold text-xl">
              A
            </div>
            <h3 className="mt-4 font-medium">Alice Johnson</h3>
            <p className="text-sm text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#FF6154]/50 text-white flex items-center justify-center font-bold text-xl">
              B
            </div>
            <h3 className="mt-4 font-medium">Bob Smith</h3>
            <p className="text-sm text-gray-600">CTO</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#FF6154]/50 text-white flex items-center justify-center font-bold text-xl">
              C
            </div>
            <h3 className="mt-4 font-medium">Charlie Brown</h3>
            <p className="text-sm text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-[#FF6154] mb-4">Join Us</h2>
        <p className="text-gray-700 mb-6">
          Be a part of our journey and help us create amazing technology solutions.
        </p>
        <button className="px-6 py-3 bg-[#FF6154] text-white rounded-lg shadow-md hover:bg-[#e6554b] transition cursor-pointer">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default About;
