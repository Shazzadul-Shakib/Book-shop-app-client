import AdminViewUsersSkeleton from "../../../components/main/skeletons/AdminViewUsersSkeleton";
import {
  useGetAllUsersQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/auth/authApi";
import { CircleSlash2, SquareCheckBig } from "lucide-react";
import { User } from "../../../redux/features/auth/authSlice";

const AdminViewUsersPage: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Users</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading || isUpdating ? (
            <div className="space-y-4 p-6">
              {[...Array(3)].map((_, index) => (
                <AdminViewUsersSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {data?.data?.map((user: User) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      Role: <span className="text-indigo-600">{user.role}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {user.isBlocked ? (
                      <button
                        onClick={() =>
                          updateUser({
                            userId: user._id,
                            data: { isBlocked: false },
                          })
                        }
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                        title="Unblock User"
                      >
                        <CircleSlash2 className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updateUser({
                            userId: user._id,
                            data: { isBlocked: true },
                          })
                        }
                        className="p-2 rounded-lg bg-red-50 text-green-600 hover:bg-green-100 transition-colors duration-200"
                        title="Block User"
                      >
                        <SquareCheckBig className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminViewUsersPage;
