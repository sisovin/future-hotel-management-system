import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Filter, Info, MoreHorizontal } from "lucide-react";

interface ChartCardProps {
  title?: string;
  description?: string;
  chartType?: "occupancy" | "revenue";
  data?: any;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onViewDetails?: () => void;
}

const ChartCard = ({
  title = "Occupancy Rate",
  description = "Current occupancy statistics across all properties",
  chartType = "occupancy",
  data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        values: [65, 72, 86, 81, 90, 95],
        color: "#6366f1",
      },
    ],
  },
  filters = ["Daily", "Weekly", "Monthly", "Yearly"],
  onFilterChange = () => {},
  onViewDetails = () => {},
}: ChartCardProps) => {
  const [activeFilter, setActiveFilter] = React.useState(filters[2]);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  // Mock chart rendering - in a real implementation, you would use a charting library
  const renderChart = () => {
    const maxValue = Math.max(...data.datasets[0].values);

    return (
      <div className="relative h-48 w-full mt-4">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-40">
          {data.datasets[0].values.map((value: number, index: number) => {
            const height = (value / maxValue) * 100;

            return (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-8 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md relative group"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded pointer-events-none"
                >
                  {value}%
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-300 opacity-30"></div>
              </motion.div>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="text-center w-8">
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card
      className="w-full bg-black/40 backdrop-blur-md border-gray-800 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="circuit"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10,10 L90,10 L90,90 L10,90 Z"
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.5"
            />
            <circle cx="10" cy="10" r="2" fill="#6366f1" />
            <circle cx="90" cy="10" r="2" fill="#6366f1" />
            <circle cx="90" cy="90" r="2" fill="#6366f1" />
            <circle cx="10" cy="90" r="2" fill="#6366f1" />
            <path
              d="M10,50 L40,50 M60,50 L90,50 M50,10 L50,40 M50,60 L50,90"
              stroke="#6366f1"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            {title}
            <Badge
              variant="outline"
              className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
            >
              {chartType === "occupancy" ? "Occupancy" : "Revenue"}
            </Badge>
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue={activeFilter} className="w-full">
            <TabsList className="bg-gray-900/50 border border-gray-800">
              {filters.map((filter) => (
                <TabsTrigger
                  key={filter}
                  value={filter}
                  onClick={() => handleFilterChange(filter)}
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  {filter}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="sm"
            className="ml-2 border-gray-700 bg-gray-900/50 hover:bg-gray-800"
          >
            <Filter className="h-3.5 w-3.5 mr-1" />
            Filter
          </Button>
        </div>

        {renderChart()}

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-white">
              {chartType === "occupancy" ? "87%" : "$128,450"}
            </p>
            <div className="flex items-center text-emerald-500 text-sm">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% from last {activeFilter.toLowerCase()}</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>

        {/* Particle effects */}
        <motion.div
          className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-indigo-400"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: [0, 0.8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
