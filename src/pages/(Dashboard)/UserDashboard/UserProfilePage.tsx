import { useState } from "react";
import ModalBody from "../../../components/dashboard/modals/ModalBody";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import UpdatePasswordModalCard from "../../../components/dashboard/modals/UpdatePasswordModalCard";
import UpdateUserProfileModal from "../../../components/dashboard/modals/UpdateUserProfileModal";

const UserProfilePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const user = useAppSelector(currentUser);

  return (
    <div>
      <p className="text-xl font-semibold mb-4 text-primary">
        Profile Settings
      </p>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <img
          src={user?.image || "/Hero/hero-bg.jpg"}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <div className="w-full mt-6 space-y-2">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full text-sm font-semibold cursor-pointer bg-primary text-white py-2 rounded"
          >
            Update Profile
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full text-sm font-semibold cursor-pointer border border-primary text-primary py-2 rounded"
          >
            Change Password
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ModalBody>
          <UpdatePasswordModalCard onclose={() => setIsModalOpen(false)} />
        </ModalBody>
      )}
      {isProfileModalOpen && (
        <ModalBody>
          <UpdateUserProfileModal
            onclose={() => setIsProfileModalOpen(false)}
          />
        </ModalBody>
      )}
    </div>
  );
};

export default UserProfilePage;
