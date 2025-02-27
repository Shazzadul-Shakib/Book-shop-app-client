import { useForm } from "react-hook-form";
import { useState } from "react";
import { getImageUrl } from "../../../utils/getImageUrl";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import LoadingSpinner from "../../main/shared/Spinner";
import { toast } from "sonner";

interface AddNewBookModalProps {
  onClose: VoidFunction;
}

const AddNewBookModal: React.FC<AddNewBookModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: string;
    author: string;
    price: number;
    category: string;
    image: string | null;
    description: string;
    quantity: number;
  }>({
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      category: "",
      image: "",
      description: "",
      quantity: 0,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: {
    title: string;
    author: string;
    price: number;
    category: string;
    image: string | null;
    description: string;
    quantity: number;
  }) => {
    try {
      setIsLoading(true);

      // Ensure price is parsed as a float
      data.price = parseFloat(data.price.toString());

      if (selectedFile) {
        const uploadedImageUrl = await getImageUrl(selectedFile);
        data.image = uploadedImageUrl;
      }
      const response = await addProduct(data).unwrap();
      if (response.success) {
        onClose();
        toast.success("Book added successfully");
      }
    } catch (error) {
      console.error("Error updating Book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto h-[95dvh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-6 text-center">Add New Book</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter book title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="author">
            Author
          </label>
          <input
            id="author"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter author name"
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter price"
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("category", { required: "Category is required" })}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="SelfDevelopment">Self Development</option>
            <option value="Poetry">Poetry</option>
            <option value="Religious">Religious</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a brief description of the book"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter quantity"
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
            })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="image">
            Book Cover
          </label>
          <input
            id="image"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Book Preview"
              className="mt-4 w-32 h-32 object-cover mx-auto rounded"
            />
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md cursor-pointer"
            disabled={isLoading}
          >
            {isLoading || isAdding ? <LoadingSpinner/> : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookModal;
