// pages/index.js
export default function Home() {
  const tools = [
    {
      name: "PC Builder",
      image: "https://source.unsplash.com/400x300/?pc",
    },
    {
      name: "NAS Builder",
      image: "https://source.unsplash.com/400x300/?nas",
    },
    {
      name: "Gaming PC Finder",
      image: "https://source.unsplash.com/400x300/?gaming-pc",
    },
    {
      name: "Laptop Finder",
      image: "https://source.unsplash.com/400x300/?laptop",
    },
    {
      name: "PSU Calculator",
      image: "https://source.unsplash.com/400x300/?psu",
    },
  ];

  return (
    <div className=" bg-white  margin-Home margin-right">
      <h1 className="  margin-bottom margin-top ">Shopping Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-bold mb-4">{tool.name}</h2>
            <img
              src={tool.image}
              alt={tool.name}
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
