import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
  "Cryptocurrency"
];

const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

const UpdateProduct = ({ product, modal, refresh }) => {
  const { _id, name, image, description, externalLinks, tags } = product;
  // console.log(product)
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [updatedProduct, setUpdatedProduct] = useState({
    name,
    image: image,
    description,
    externalLinks,
    tags
  });


  useEffect(() => {
    let newProduct = {
      _id: "",
      name: "",
      image: "",
      description: "",
      externalLinks: [],
      tags: []
    }
    if (name) {
      newProduct = {_id, name, image, description, externalLinks, tags }
    }
    // console.log(newProduct)
    setUpdatedProduct(newProduct)
  }, [_id, image, name, description, externalLinks, tags])

  const [loading, setLoading] = useState(false)

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const { name, image, description, externalLinks, tags } = updatedProduct;
    console.log(updatedProduct)
    if (!name || !image || !description || externalLinks.length < 1) {
      return Swal.fire({
        title: "Please, fill all the input field.",
        icon: "info"
      })
    } else if (tags.length < 3) {
      return Swal.fire({
        title: "Please select at least 3 Tags.",
        icon: "info"
      })
    }
    try {
      setLoading(true)
      let imgURL = image;
      const imgFile = { image: image }
      console.log(updatedProduct)
      const imgResponse = await axiosPublic.post(img_hosting_url, imgFile, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      if (imgResponse.data.success) {
        imgURL = imgResponse.data.data.url;
      }


      const updatedProductInfo = { name, image: imgURL, description, externalLinks, tags }

      const dbResponse = await axiosSecure.patch(`/products/${_id}`, updatedProductInfo)

      console.log(dbResponse.data)
      if (dbResponse.data.modifiedCount > 0) {
        e.target.reset()
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        modal.close()
        refresh()
        return Swal.fire({
          title: "The Product info has been updated.",
          icon: 'success',
          footer: "Wait until Moderator approve it."
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      // console.log("Finally block inside handleUpdateProduct function has been called.")
    }
  };

  // function to handle tag selection
  const handleTagChange = (tag) => {
    // check if the tag is already selected. remove it if already selected
    if (updatedProduct.tags.includes(tag)) {
      return setUpdatedProduct({ ...updatedProduct, tags: updatedProduct.tags.filter(t => t !== tag) })
    } else {
      setUpdatedProduct({ ...updatedProduct, tags: [...updatedProduct.tags, tag] })
    }
  }

  return (
    <div className="modal-box !px-0 !py-0 h-auto relative duration-300 w-11/12 max-w-3xl flex items-center justify-center">
      {/* loading spinner */}
      {loading &&
        <div className="absolute inset-0 bg-slate-700/30 flex items-center justify-center z-50">
          <span className="loader scale-200"></span>
        </div>
      }
      <form method="dialog" className="!z-50">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">✕</button>
      </form>
      <form onSubmit={handleUpdateProduct} className="relative">
        <fieldset className="fieldset bg-base-200 border border-base-300 p-6 rounded-box space-y-2.5">
          <h1 className="text-lg text-center">Update Product</h1>

          <label className="fieldset-label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name of Your Product"
            value={updatedProduct.name}
            defaultValue={name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            required
          />

          <label className="fieldset-label">Description</label>
          <textarea
            rows={4}
            className="textarea w-full focus:outline-none"
            placeholder="Write Product Description"
            value={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
            required
          />

          <label className="fieldset-label">External Link</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter Product Link"
            value={updatedProduct.externalLinks}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, externalLinks: [e.target.value] })}
            required
          />

          <label className="fieldset-label">Pick an image file</label>
          <input
            type="file"
            className="file-input w-full focus:outline-none"
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.files[0] })}
          />

          <label className="fieldset-label">Select Tags</label>
          <div className="flex gap-1.5 flex-wrap">
            {uniqueTags.map((tag) => (
              <label key={tag} className="fieldset-label">
                <input
                  type="checkbox"
                  onChange={() => handleTagChange(tag)}
                  className="checkbox checkbox-sm"
                  checked={updatedProduct.tags.includes(tag)}
                />
                {tag}
              </label>
            ))}
          </div>

          <button className="btn btn-neutral mt-4">Update Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateProduct;
