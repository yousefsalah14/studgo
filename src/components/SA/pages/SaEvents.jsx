import { useEffect } from "react";
import TableSearch from "../components/TableSearch.jsx";
import { ListFilter, Plus } from "lucide-react";
import Search from "../components/Search.jsx";
const events = [
  {
    id: 1,
    title: "React Workshop",
    description: "Learn React fundamentals with hands-on examples.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 2,
    title: "Node.js Bootcamp",
    description: "Deep dive into backend development with Node.js.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 3,
    title: "AI in Web Development",
    description: "Explore AI-powered web applications.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 3,
    title: "AI in Web Development",
    description: "Explore AI-powered web applications.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 3,
    title: "AI in Web Development",
    description: "Explore AI-powered web applications.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 3,
    title: "AI in Web Development",
    description: "Explore AI-powered web applications.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
];
function SaEvents() {

  return <div className="text-white p-4 rondedd-md flex-1 m-4 mt-0">
    <div className="flex justify-between items-center ">
    <h2 className="hidden md:block text-2xl font-bold ">Manage Your Events </h2>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <Search />
      <div className="flex  items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center  bg-blue-500 justify-center rounded-full "><ListFilter /></button>
        <button className="w-8 h-8 flex items-center  bg-blue-500 justify-center rounded-full "><Plus /></button>
        
      </div>

    </div>
    
    </div>
    <div className="flex flex-wrap gap-4 justify-start mt-8">
  {events.map((event) => (
    <div key={event.id} className="bg-gray-900 w-96 shadow-sm rounded-lg overflow-hidden">
      <figure className="px-2 pt-4">
        <img
          src={event.image}
          alt={event.title}
          className="rounded-lg object-cover h-40 w-full"
        />
      </figure>
      <div className="p-6 text-white text-center flex flex-col items-center">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <p className="text-gray-300">{event.description}</p>
        <div className="mt-4 flex gap-4 items-center">
          <button className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Learn More
          </button>
          <button className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Apply
          </button>
        </div>
      </div>
    </div>
  ))}
</div>





    </div>;
}

export default SaEvents;
