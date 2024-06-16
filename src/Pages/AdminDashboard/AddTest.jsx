import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const AddTest = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const handleAddtest = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const details = form.details.value;
    const price = form.price.value;
    const date = form.date.value;
    const slots = form.slots.value;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const testData = {
        test_name: name,
        image: data.data.display_url,
        test_details: details,
        test_price: price,
        test_date: date,
        test_slots: slots,
      };

      axiosSecure.post("/tests", testData).then((res) => {
        if (res.data.insertedId) {
          setLoading(false);
          form.reset();
          setImagePreview("");
          Swal.fire({
            title: "Added",
            text: "Test is listed successfully",
            icon: "success",
          });
        }
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload test",
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
          <h1 className="my-3 text-4xl font-bold text-[#473288]">Add Test</h1>
          <p className="text-sm text-gray-400">MediNova diagnostic center</p>
        </div>
        <div className="flex gap-4 items-center">
          <form
            onSubmit={handleAddtest}
            className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="grid md:grid-cols-2 items-center gap-4 justify-center">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">
                    Test Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Test Name Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Select Image:
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
                  <label htmlFor="details" className="block mb-2 text-sm">
                    Test Details
                  </label>
                  <textarea
                    type="text"
                    name="details"
                    id="details"
                    required
                    placeholder="Text Details.."
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter test price"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    min={currentDate}
                    placeholder="Enter test date"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>

                <div className="relative">
                  <div className="flex justify-between">
                    <label htmlFor="slots" className="text-sm mb-2">
                      Slot Availability
                    </label>
                  </div>
                  <input
                    type="number"
                    name="slots"
                    id="slots"
                    required
                    placeholder="Enter slots number"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  />
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

export default AddTest;
