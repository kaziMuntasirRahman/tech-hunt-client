import React from "react";

const Contact = () => {
  return (
    <div className="contact-page bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#FF6154]">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 mb-10">
          Have questions or need help? Feel free to reach out to us!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#FF6154]">
              Our Address
            </h2>
            <p className="text-gray-800 mb-2">
              123 Tech Street, Innovation City, Techland 45678
            </p>
            <p className="text-gray-800 mb-2">Phone: +1 (123) 456-7890</p>
            <p className="text-gray-800">Email: support@techhunt.com</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#FF6154]">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  className="block text-gray-800 font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  rows="5"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#FF6154] text-white px-6 py-3 rounded shadow hover:bg-[#e6554b] transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;