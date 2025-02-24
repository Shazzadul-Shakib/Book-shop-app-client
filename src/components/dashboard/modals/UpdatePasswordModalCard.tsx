/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useUpdatePasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import LoadingSpinner from "../../main/shared/Spinner";

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current Password is required"),
  newPassword: z.string().min(1, "New Password is required"),
});

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

interface UpdatePasswordModalCardProps {
  onclose: VoidFunction;
}

const UpdatePasswordModalCard: React.FC<UpdatePasswordModalCardProps> = ({
  onclose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const user = useAppSelector(currentUser);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      const res = await updatePassword({ data, userId: user?._id }).unwrap();

      if (res.success) {
        toast.success(res?.message || "password updaed successfully");
        onclose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Update Password</h2>
        <button
          onClick={onclose}
          className="text-gray-500 px-2 flex justify-center items-center rounded-md text-2xl font-bold hover:text-red-700 cursor-pointer"
        >
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword")}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full  inline-flex justify-center py-3 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary cursor-pointer"
          >
            {isLoading ? <LoadingSpinner /> : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordModalCard;
