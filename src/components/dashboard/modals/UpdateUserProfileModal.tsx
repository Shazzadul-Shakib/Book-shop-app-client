/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { getImageUrl } from "../../../utils/getImageUrl";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { currentUser, setUser } from "../../../redux/features/auth/authSlice";
import { useUpdateProfileMutation } from "../../../redux/features/auth/authApi";
import { verifyToken } from "../../../utils/verifyToken";
import { toast } from "sonner";
import LoadingSpinner from "../../main/shared/Spinner";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface UpdateProfileModalCardProps {
  onclose: VoidFunction;
}

const UpdateUserProfileModal: React.FC<UpdateProfileModalCardProps> = ({
  onclose,
}) => {
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      image: user?.image || "",
    },
  });

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.image || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      setIsLoading(true);

      if (selectedFile) {
        const uploadedImageUrl = await getImageUrl(selectedFile);
        data.image = uploadedImageUrl;
      }

      const result = await updateProfile({ data, userId: user?._id }).unwrap();
      const updatedUser = verifyToken(result.data.token);

      dispatch(setUser({ user: updatedUser, token: result.data.token }));
      onclose();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Update Profile</h2>
        <button
          onClick={onclose}
          className="text-gray-500 p-2 rounded-md text-2xl font-bold hover:text-red-700 cursor-pointer"
        >
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="mt-4 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary cursor-pointer"
          >
            {isLoading || isUpdating ? <LoadingSpinner /> : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfileModal;
