import { useEffect } from "react";
import TableSearch from "../components/TableSearch.jsx";
import { ListFilter, Plus } from "lucide-react";
import Search from "../components/Search.jsx";
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

    </div>;
}

export default SaEvents;
