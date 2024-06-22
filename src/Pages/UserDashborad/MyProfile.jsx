import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const axiosSecure = useAxiosSecure();

  const {
    data: userData = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () => fetch("/Dristrict.json").then((res) => res.json()),
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: () => fetch("/Upazila.json").then((res) => res.json()),
  });

  const handleChanges = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    if (district === "Select Your District") {
      toast.error("You have to select valid district");
      return;
    }

    if (upazila === "Select Your Upazila") {
      toast.error("You have to select valid upazila");
      return;
    }

    if (bloodGroup === "select blood group") {
      toast.error("You have to select valid bloodgroup");
      return;
    }

    let imageUrl = userData.image;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        imageUrl = data.data.display_url;
      } catch (error) {
        toast.error("Image upload failed: " + error.message);
        return;
      }
    }

    try {
      await updateUserProfile(name, imageUrl);

      const userInputData = {
        name,
        image: imageUrl,
        email,
        bloodGroup,
        district,
        upazila,
        status: "active",
      };

      const res = await axiosSecure.patch(
        `/users/${userData._id}`,
        userInputData
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Profile Updated successfully");
      }
    } catch (error) {
      toast.error("Ohh ohh something went wrong..!" + error.message);
    }
  };

  return (
    <div>
      <Helmet>Medinova-Profile</Helmet>
      <h1 className="text-4xl font-black">YOUR PROFILE</h1>

      <div className="p-10 bg-blue-50 rounded-xl my-6">
        <div className="flex justify-between">
          <img
            className="w-40 h-40 object-cover rounded-xl mb-4"
            src={user?.photoURL}
            alt=""
          />
          <button
            className={`btn ${
              isDisabled ? "bg-yellow-500 text-white" : "bg-red-500 text-white"
            }`}
            onClick={() => setIsDisabled(!isDisabled)}>
            {isDisabled ? "Enable Edit" : "Disable Edit"}
          </button>
        </div>
        <form
          onSubmit={handleChanges}
          className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="grid md:grid-cols-2 items-center gap-4 justify-center">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={userData.name || user.displayName}
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  disabled={isDisabled}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="bloodGroup" className="block mb-2 text-sm">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  disabled={isDisabled}
                  defaultValue={userData.bloodGroup || "select blood group"}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900">
                  <option value="select blood group" disabled>
                    {userData.bloodGroup || "Select Blood Group"}
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label htmlFor="district" className="block mb-2 text-sm">
                  District
                </label>
                <select
                  name="district"
                  disabled={isDisabled}
                  defaultValue={userData.district || "Select Your District"}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900">
                  <option value="Select Your District" disabled>
                    {userData.district || "Select Your District"}
                  </option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="upazila" className="block mb-2 text-sm">
                  Upazila
                </label>
                <select
                  name="upazila"
                  defaultValue={userData.upazila || "Select Your Upazila"}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  disabled={isDisabled}>
                  <option value="Select Your Upazila" disabled>
                    {userData.upazila || "Select Your Upazila"}
                  </option>
                  {upazilas.map((upazila, index) => (
                    <option key={index} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value={`${isLoading ? "Please wait..." : "Save changes"}`}
            className="btn bg-blue-400 text-white"
            disabled={isDisabled}
          />
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
