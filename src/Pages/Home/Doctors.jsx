import { useQuery } from "@tanstack/react-query";

const Doctors = () => {
  const {
    data: doctorsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("/doctors.json");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">
        All Doctors in Your Town
      </h1>
      <div className="grid md:grid-cols-3 gap-4">
        {doctorsData.map((doctor, index) => (
          <div
            key={index}
            className="w-full overflow-hidden bg-slate-200 rounded-lg shadow-lg dark:bg-gray-800">
            <img
              className="object-cover w-full h-56"
              src={
                doctor.doctor_image ||
                "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              }
              alt={doctor.name}
            />
            <div className="py-5 text-center">
              <a
                href="#"
                className="block text-xl font-bold text-gray-800 dark:text-white"
                tabIndex="0"
                role="link">
                {doctor.doctor_name}
              </a>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {doctor.doctor_location}
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                ${doctor.doctor_fee} appointment
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
