import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { DNA } from "react-loader-spinner";

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isPending] = useAdmin();
  const location = useLocation();

  if (loading || isPending)
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  if (user && isAdmin) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default AdminRoutes;
