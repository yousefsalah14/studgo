import WelcomeBanner from "../components/WelcomeBanner.jsx";
import Card from "../components/Card.jsx";
import Chart from "../components/Chart.jsx";
import { useQuery } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Attendace from "../components/Attendace.jsx";
import EventCalendar from "../components/EventCalendar.jsx";

function SaMain() {
  // Function to fetch data from API
  const fetchData = async (type) => {
    try {
      const response = await axios.get(`https://studgov1.runasp.net/api/${type}/all`);
      return response.data.data;
    } catch (error) {
      toast.error(`Error fetching ${type} data`);
      throw error;
    }
  };

  // Custom Hook to get the count of each type
  const FetchCount = (type) => {
    const { data, isError, isLoading, error } = useQuery({
      queryKey: ["data", type],
      queryFn: () => fetchData(type),
      retry: 2,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });

    return {
      count: data ? data.length : 0,
      isError,
      isLoading,
      error,
    };
  };

  // Fetch counts for each type
  const events = FetchCount("events");
  const talks = FetchCount("talks");
  const workshops = FetchCount("workshops");
  const members = FetchCount("members");

  // Check if any query is loading
  const isLoading = events.isLoading || talks.isLoading || workshops.isLoading || members.isLoading;
  
  // Check if any query has an error
  const hasError = events.isError || talks.isError || workshops.isError || members.isError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-red-500">Failed to load dashboard data. Please try again later.</div>
      </div>
    );
  }

  // Chart Data
  const chartData = [
    { name: "Events", value: events.count, color: "#4F46E5" },  // Indigo
    { name: "Talks", value: talks.count, color: "#22C55E" },    // Green
    { name: "Workshops", value: workshops.count, color: "#FACC15" }, // Yellow
    { name: "Members", value: members.count, color: "#EF4444" }, // Red
  ];

  return (
    <>

      <WelcomeBanner />
    
      <div className="flex p-4 gap-4 flex-col md:flex-row">
        {/* Left */}
        <div className="w-full lg:w-2/3">
          {/* Cards */}
          <div className="flex justify-between gap-4 flex-wrap">
            <Card type="Events" count={events.count} isLoading={events.isLoading} />
            <Card type="Talks" count={talks.count} isLoading={talks.isLoading} />
            <Card type="Workshops" count={workshops.count} isLoading={workshops.isLoading} />
            <Card type="Members" count={members.count} isLoading={members.isLoading} />
          </div>

          {/* Chart Section (Stacked Vertically) */}

            <div className="p-4 bg-gray-800 rounded-2xl shadow-md">
              <h2 className="text-white text-lg font-semibold mb-2">Statistics</h2>
              <div className="w-full h-[400px] flex justify-center items-center">
                <Chart data={chartData} />
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-2xl shadow-md">
              <h2 className="text-white text-lg font-semibold mb-2">Statistics</h2>
              <div className="w-full h-[500px] flex justify-center items-center">
                <Attendace />
              </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 "> 
          <EventCalendar />
        </div>
      </div>
    </>
  );
}

export default SaMain;
