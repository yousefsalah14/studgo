import { useEffect, useState } from "react";

import Sponsor from "../Sponser.jsx";
import Features from "../Features.jsx";
import Subscribe from "../Subscribe.jsx";
import ExploreSection from "../Explore.jsx";

const stats = [
  { name: "Organizations", value: 100 },
  { name: "Activities", value: 50 },
  { name: "Opportunities", value: 200 },
  { name: "Growth Potential", value: "Unlimited" },
];

function Home() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      if (typeof stat.value === "number") {
        return setInterval(() => {
          setCounts((prev) => {
            const newCounts = [...prev];
            if (newCounts[index] < stat.value) {
              newCounts[index] += 1;
            }
            return newCounts;
          });
        }, 30);
      }
      return null;
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 min-h-screen py-24 sm:py-32">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-5xl">
              Join Our Student Network
            </h2>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
              Discover activities, events, scholarships, and internships tailored for students like you. Stay ahead and
              make the most of your academic journey.
            </p>
            <dl className="mt-16 grid grid-cols-1 gap-9 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={stat.name} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 whitespace-nowrap text-gray-300">{stat.name}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-white">
                    {typeof stat.value === "number" ? counts[index] : stat.value}
                    {typeof stat.value === "number" ? "+" : ""}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      <Sponsor />
      <ExploreSection />
      <Features />
      <Subscribe />
    </>
  );
}

export default Home;
