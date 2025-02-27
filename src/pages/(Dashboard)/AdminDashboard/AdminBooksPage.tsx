import { useState } from "react";
import {
  useDeleteSingleProductMutation,
  useGetAllProductQuery,
} from "../../../redux/features/product/productApi";
import { BookPlus, Pencil, Trash } from "lucide-react";
import ModalBody from "../../../components/dashboard/modals/ModalBody";
import UpdateBookModal from "../../../components/dashboard/modals/UpdateBookModal";
import { Book } from "../../../types/AllTypes";
import AdminBookManagementSkeleton from "../../../components/main/skeletons/AdminBookManagementSkeleton";
import AddNewBookModal from "../../../components/dashboard/modals/AddNewBookModal";
import { toast } from "sonner";

const AdminBooksPage: React.FC = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined);
  const [deleteSingleProduct, { isLoading: isBookDeleting }] =
    useDeleteSingleProductMutation();

  // State for handling modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleDelete = async (id: string) => {
    const res = await deleteSingleProduct(id);
    if (res.data) toast.success("Book deleted successfully");
  };

  if (isLoading || isBookDeleting)
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Books Management
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <AdminBookManagementSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Books Management</h2>
        <div>
          <button
            className="bg-primary flex items-center justify-center gap-3 text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => setIsAddBookModalOpen(true)}
          >
            <BookPlus size={20} />
            Add New Book
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data?.map((book: Book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p
                className={`text-sm font-semibold ${
                  book.inStock ? "text-green-500" : "text-red-500"
                }`}
              >
                {book.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {book.category}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Price:</span> ${book.price}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Quantity:</span> {book.quantity}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="bg-blue-50 text-blue-600 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedBook(book);
                  setIsModalOpen(true);
                }}
              >
                <Pencil size={16} />
                Edit
              </button>
              <button
                className="bg-red-50 text-red-600 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                onClick={() => handleDelete(book._id)}
              >
                <Trash size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedBook && (
        <ModalBody>
          <UpdateBookModal
            book={selectedBook}
            onClose={() => setIsModalOpen(false)}
          />
        </ModalBody>
      )}
      {isAddBookModalOpen && (
        <ModalBody>
          <AddNewBookModal onClose={() => setIsAddBookModalOpen(false)} />
        </ModalBody>
      )}
    </div>
  );
};

export default AdminBooksPage;
