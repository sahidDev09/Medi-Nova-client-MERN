import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const UpdateTest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const {
    data: tests = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["testsUpdate", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tests/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const handleAddtest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const details = form.details.value;
    const price = form.price.value;
    const date = form.date.value;
    const slots = form.slots.value;

    try {
      let imageUrl = tests.image;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );

        imageUrl = imgResponse.data.data.display_url;
      }

      const testData = {
        test_name: name,
        image: imageUrl,
        test_details: details,
        test_price: price,
        test_date: date,
        test_slots: slots,
      };

      const res = await axiosSecure.patch(
        `/tests/update/${tests._id}`,
        testData
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Updated",
          text: "Data updated successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Data updated failed",
          icon: "error",
        });
      }
    } catch (error) {
      toast.error("someting went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return <h1>Loading...please wait a moment</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>Medinova- Update test</Helmet>
      <div className="flex flex-col p-6 rounded-md sm:p-10 bg-blue-50 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-[#473288]">
            Update Tests
          </h1>
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
                    defaultValue={tests.test_name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Test Name Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Change Image:
                  </label>
                  <input
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
                    defaultValue={tests.test_details}
                    required
                    placeholder="Test Details.."
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
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
                    defaultValue={tests.test_price}
                    id="price"
                    placeholder="Enter test price"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={tests.test_date}
                    id="date"
                    min={currentDate}
                    placeholder="Enter test date"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
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
                    defaultValue={tests.test_slots}
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
                    />
                  </div>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
          {imagePreview ? (
            <img
              className="w-96 hidden md:inline object-fit"
              src={imagePreview}
              alt="Selected"
            />
          ) : (
            <img
              className="w-96 hidden md:inline object-fit"
              src={tests.image}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateTest;
