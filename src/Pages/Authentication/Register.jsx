import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { PiSpinnerBallFill } from "react-icons/pi";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () => fetch("/Dristrict.json").then((res) => res.json()),
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: () => fetch("/Upazila.json").then((res) => res.json()),
  });

  // authentication
  const { updateUserProfile, createUser, loading, setLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const confirmPass = form["confirm-password"].value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    const formData = new FormData();
    formData.append("image", image);

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const result = await createUser(email, password);
      console.log(result);
      await updateUserProfile(name, data.data.display_url);
      navigate("/");
      setLoading(false);

      const userInputData = {
        name,
        image: data.data.display_url,
        email,
        bloodGroup,
        district,
        upazila,
        status: "active",
      };

      const res = await axiosPublic.post("/allusers", userInputData);
      if (res.data.insertedId) {
        toast.success("Account created successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Ohh ohh something went wrong..!" + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>Medinova-Register</Helmet>
      <div className="flex flex-col p-6 rounded-md sm:p-10 bg-blue-50 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-[#473288]">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to MediNova</p>
        </div>
        <form
          onSubmit={handleSubmit}
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
                  placeholder="Enter Your Name Here"
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
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                />
                <span onClick={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <FaEye className="absolute right-2 top-1/2 transform translate-y-1/4 text-lg " />
                  ) : (
                    <FaEyeSlash className="absolute right-2 top-1/2 transform translate-y-1/4 text-lg" />
                  )}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="bloodGroup" className="block mb-2 text-sm">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  defaultValue="select blood group"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900">
                  <option value="select blood group" disabled>
                    Select Blood Group
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
                  defaultValue="Select Your District"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900">
                  <option value="Select Your District" disabled>
                    Select Your District
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
                  defaultValue="Select Your Upazila"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900">
                  <option value="Select Your Upazila" disabled>
                    Select Your Upazila
                  </option>
                  {upazilas.map((upazila, index) => (
                    <option key={index} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <label htmlFor="confirm-password" className="text-sm mb-2">
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  name="confirm-password"
                  autoComplete="new-password"
                  id="confirm-password"
                  required
                  placeholder="*******"
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
                <PiSpinnerBallFill className="mx-auto text-xl animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
