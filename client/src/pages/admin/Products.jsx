import moment from "moment";
import {
  ArrowUpCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const Products = ({ products }) => {
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
                      {product.status === "pending" ? (
                        <span className="bg-yellow-400 p-1 text-xs font-mono text-white rounded-md">
                          {product.status}
                        </span>
                      ) : (
                        <span className="bg-green-400 p-1 text-xs font-mono text-white rounded-md">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:underline me-4"
                        onClick={() => {
                          uploadHandler(product._id);
                        }}
                        title="Upload"
                      >
                        <ArrowUpCircleIcon width={20} />
                      </button>
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:underline me-4"
                        onClick={() => {
                          editHandler(product._id);
                        }}
                        title="Edit"
                      >
                        <PencilSquareIcon width={20} />
                      </button>
                      <button
                        type="button"
                        className="font-medium text-red-600 hover:underline"
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                        title="Delete"
                      >
                        <TrashIcon width={20} />
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
