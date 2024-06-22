import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAddBanner = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.files[0];
    const slogan = form.slogan.value;
    const coupon = form.coupon.value;
    const discountrated = form.discountrated.value;
    const status = form.status.value;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const bannerData = {
        title: title,
        image: data.data.display_url,
        text_slogan: slogan,
        coupon_code: coupon,
        discount_rate_for_coupon: discountrated,
        status: status,
      };

      axiosSecure.post("/banner", bannerData).then((res) => {
        if (res.data.insertedId) {
          setLoading(false);
          form.reset();
          setImagePreview("");
          navigate("/dashboard/bannerlist");
          Swal.fire({
            title: "Added",
            text: "Banner is listed successfully",
            icon: "success",
          });
        }
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload banner",
        icon: "error",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col p-6 rounded-md sm:p-10 bg-blue-50 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-[#473288]">Add Banner</h1>
          <p className="text-sm text-gray-400">MediNova diagnostic center</p>
        </div>
        <div className="flex gap-4 items-center">
          <form
            onSubmit={handleAddBanner}
            className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="grid md:grid-cols-2 items-center gap-4 justify-center">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="name"
                    placeholder="Enter banner title"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Select Banner image:
                  </label>
                  <input
                    required
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label htmlFor="slogan" className="block mb-2 text-sm">
                    Banner Slogan
                  </label>
                  <textarea
                    type="text"
                    name="slogan"
                    id="slogan"
                    required
                    placeholder="Text slogan.."
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="coupon" className="block mb-2 text-sm">
                    Coupon code
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Enter coupon code "
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>

                <div className="relative">
                  <div className="flex justify-between">
                    <label htmlFor="discountrated" className="text-sm mb-2">
                      Dicount Rates
                    </label>
                  </div>
                  <input
                    type="number"
                    name="discountrated"
                    id="discountrated"
                    required
                    placeholder="Enter rate for coupon"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="bloodGroup" className="block mb-2 text-sm">
                    Banner status
                  </label>
                  <select
                    name="status"
                    required
                    defaultValue="select status"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900">
                    <option value="select status" disabled>
                      Select Blood Group
                    </option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#8F85DD] w-full rounded-md py-3 text-white">
                {loading ? (
                  <div className="w-full flex justify-center">
                    <ThreeDots
                      visible={true}
                      width="50"
                      height="25"
                      color="#ffff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  "Upload Test"
                )}
              </button>
            </div>
          </form>
          {imagePreview && (
            <img
              className="w-96 hidden md:inline object-fit"
              src={imagePreview}
              alt="Selected"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
