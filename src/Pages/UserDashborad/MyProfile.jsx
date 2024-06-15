import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1 className=" text-4xl">This is my Profile</h1>
      <h1>{user?.displayName}</h1>
    </div>
  );
};

export default MyProfile;
