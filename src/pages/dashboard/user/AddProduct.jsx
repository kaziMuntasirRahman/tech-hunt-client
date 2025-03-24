import { useState } from "react";
import Swal from "sweetalert2";
import useGetStatus from "../../../hooks/useGetStatus";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const uniqueTags = [
  "AI Tools",
  "Software",
  "Developer Tools",
  "Learning & Education",
  "Web Apps",
  "Online Courses",
  "Games",
  "Mobile Apps",
  "Entertainment",
  "Hardware",
  "Emerging Technologies",
  "Home Automation",
  "Open Source Projects",
  "Chatbot Development",
  "Tech Services",
  "Data Storage",
  "Fitness",
  "Data Analysis",
  "Cryptocurrency",
  "Music Creation"
];
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

const AddProduct = () => {
  const { userInfo } = useGetStatus()
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    productOwner: {},
    tags: [],
    externalLinks: []
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, image, description, externalLinks, tags } = newProduct;
    const productOwner = { name: userInfo.name, email: userInfo.email, image: userInfo.photoURL || "" }
    if (!name || !image || !description) {
      return Swal.fire({
        title: "Please, fill all the input field.",
        icon: "info"
      })
    } else if (tags.length < 3) {
      return Swal.fire({
        title: "Please select at least 3 Tags.",
        icon: "info"
      })
    } else if (!productOwner.name || !productOwner.email) {
      return Swal.fire({
        title: "Sorry!!! Failed to add product.(1)",
        icon: 'error',
        footer: "Please try again later."
      })
    }
    try {
      let imgURL = "";
      const imgFile = { image: image }
      setLoading(true)
      console.log(newProduct)
      const imgResponse = await axiosPublic.post(img_hosting_url, imgFile, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      if (!imgResponse.data.success) {
        return Swal.fire({
          title: "Sorry!!! Failed to add product.(2)",
          icon: 'error',
          footer: "Please try again later."
        })
      }

      imgURL = imgResponse.data.data.url;

      const updatedProduct = [{ name, image: imgURL, description, externalLinks, tags, productOwner }]
      console.log(updatedProduct[0])

      const dbResponse = await axiosSecure.post('/products', updatedProduct)

      console.log(dbResponse.data)
      if (dbResponse.data.insertedCount > 0) {
        e.target.reset()
        setNewProduct({ name: "", image: "", description: "", productOwner: {}, tags: [], externalLinks: [] })
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        return Swal.fire({
          title: "Congratulations! Your Product has been Uploaded.",
          icon: 'success',
          footer: "Wait until Moderator approve it."
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      console.log("Finally block inside handleAddProduct function has been called.")
    }
  };

  // function to handle tag selection
  const handleTagChange = (tag) => {
    // check if the tag is already selected. remove it if already selected
    if (newProduct.tags.includes(tag)) {
      return setNewProduct({ ...newProduct, tags: newProduct.tags.filter(t => t !== tag) })
    } else {
      setNewProduct({ ...newProduct, tags: [...newProduct.tags, tag] })
    }
  }

  return (
    <div className="relative h-full flex items-center justify-center p-8">
      {
        (loading) ?
          <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
            <span className="loader scale-200" ></span>
          </div>
          :
          <></>
      }
      <form onSubmit={handleAddProduct} className="relative">
        <fieldset className="fieldset bg-base-200 border border-base-300 p-6 rounded-box space-y-2.5">
          <h1 className="text-lg text-center">Add New Product</h1>

          <label className="fieldset-label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name of Your Product"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />

          <label className="fieldset-label">Description</label>
          <textarea
            rows={7}
            className="textarea w-full focus:outline-none"
            placeholder="Write Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />

          <label className="fieldset-label">External Link</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter Product Link"
            value={newProduct.externalLinks}
            onChange={(e) => setNewProduct({ ...newProduct, externalLinks: [e.target.value] })}
            required
          />

          <label className="fieldset-label">Pick a file</label>
          <input
            type="file"
            className="file-input w-full focus:outline-none"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            required
          />

          <label className="fieldset-label">Select Tags</label>
          <div className="flex gap-1.5 flex-wrap justify-between">
            {uniqueTags.map((tag) => (
              <label key={tag} className="fieldset-label">
                <input
                  type="checkbox"
                  onChange={() => handleTagChange(tag)}
                  className="checkbox focus:outline-none focus:border-2 focus:border-black"
                  checked={newProduct.tags.includes(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
          <button className="btn btn-neutral mt-4">Add Product</button>
        </fieldset>
      </form>

    </div>
  );
};

export default AddProduct;


// Attributes of product:
// 1. _id
// 2. name
// 3. image
// 4. description
// 5.productOwner.email
// 6. productOwner.name
// 7. productOwner.image
// 8. tags [1,2,3]
// 9. externalLink
// 10. isFeatured
// 11. upvotes[]
// 12. report[]
// 13. reviews.reviewerEmail
// 14. reviews.reviewerName
// 15. reviews.reviewerImage
// 16. reviews.description
// 17. reviews.rating
// 18. reviews.postedDate
// 19. status[pending, approved, declined]
// 20. postedDate

