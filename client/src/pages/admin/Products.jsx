import moment from "moment";
import {
  BackspaceIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { message } from "antd";
import {
  approveProduct,
  rejectProduct,
  rollBackProduct,
} from "../../apicalls/admin";

const Products = ({ products, getProducts }) => {
  const approveHandler = async (productId) => {
    try {
      const response = await approveProduct(productId);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const rejectHandler = async (productId) => {
    try {
      const response = await rejectProduct(productId);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const rollbackHandler = async (productId) => {
    try {
      const response = await rollBackProduct(productId);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
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
                Seller
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
                    <td className="px-6 py-4">{product.seller.name}</td>
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
                        <span className="bg-red-500 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "approve" && (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-800 me-2 transition-all"
                          onClick={() => {
                            rejectHandler(product._id);
                          }}
                          title="Reject"
                        >
                          <XCircleIcon width={28} />
                        </button>
                      )}
                      {product.status === "reject" && (
                        <button
                          type="button"
                          className="font-medium text-green-600 hover:text-green-800 me-2 transition-all"
                          onClick={() => {
                            approveHandler(product._id);
                          }}
                          title="Approve"
                        >
                          <PlusCircleIcon width={28} />
                        </button>
                      )}

                      {product.status === "pending" && (
                        <>
                          <button
                            type="button"
                            className="font-medium text-green-600 hover:text-green-800 me-2 transition-all"
                            onClick={() => {
                              approveHandler(product._id);
                            }}
                            title="Approve"
                          >
                            <PlusCircleIcon width={28} />
                          </button>
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-800 me-2 transition-all"
                            onClick={() => {
                              rejectHandler(product._id);
                            }}
                            title="Reject"
                          >
                            <XCircleIcon width={28} />
                          </button>
                        </>
                      )}
                      {product.status !== "pending" && (
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:text-blue-800 me-2 transition-all"
                          onClick={() => {
                            rollbackHandler(product._id);
                          }}
                          title="Rollback"
                        >
                          <BackspaceIcon width={28} />
                        </button>
                      )}
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
