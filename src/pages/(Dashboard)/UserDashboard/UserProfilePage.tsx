const UserProfilePage: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <div>
      <p className="text-xl font-semibold mb-4 text-primary">
        Profile Settings
      </p>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <img
          src={"/Hero/hero-bg.jpg"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <div className="w-full mt-6 space-y-2">
          <button className="w-full text-sm font-semibold cursor-pointer bg-primary text-white py-2 rounded">
            Update Profile
          </button>
          <button className="w-full text-sm font-semibold cursor-pointer border border-primary text-primary py-2 rounded">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
