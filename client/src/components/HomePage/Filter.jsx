const Filter = ({ categories }) => {
  // Normalize and extract unique categories
  const uniqueCategories = [
    ...new Set(
      categories.map((item) =>
        item.category.trim().toUpperCase().replaceAll("_", " ")
      )
    ),
  ];

  return (
    <section className="flex gap-2 max-w-3xl flex-wrap items-center mx-auto justify-center mt-4">
      {uniqueCategories.map((category, index) => (
        <p
          key={index}
          className="bg-blue-600 rounded-lg text-white px-2 py-1 text-sm"
        >
          {category}
        </p>
      ))}
    </section>
  );
};

export default Filter;
