import moment from "moment";
import { deleteProduct } from "../../apicalls/product";
import { message } from "antd";
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts,
  setManageTabKey,
}) => {
  const editHandler = (product_id) => {
    setEditProductId(product_id);
    setEditMode(true);
    setActiveTabKey("2");
    setManageTabKey("1");
  };

  const uploadHandler = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
    setManageTabKey("2");
  };

  const deleteHandler = async (product_id) => {
    try {
      const response = await deleteProduct(product_id);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section className="px-4">
      <h1 className="text-xl font-bold my-3">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-200 transition-colors"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                    >
                      {product.name}
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "pending" && (
                        <span className=" bg-yellow-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}{" "}
                      {product.status === "approve" && (
                        <span className="bg-green-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                      {product.status === "reject" && (
                        <span className="bg-red-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:text-green-800 me-3"
                        onClick={() => {
                          uploadHandler(product._id);
                        }}
                        title="Upload"
                      >
                        <CloudArrowUpIcon width={26} />
                      </button>
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:text-blue-800 me-3"
                        onClick={() => {
                          editHandler(product._id);
                        }}
                        title="Edit"
                      >
                        <PencilSquareIcon width={26} />
                      </button>
                      <button
                        type="button"
                        className="font-medium text-red-600 hover:text-red-800 transition-all"
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                        title="Delete"
                      >
                        <TrashIcon width={26} />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td className="px-6 py-4">No product added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Products;
