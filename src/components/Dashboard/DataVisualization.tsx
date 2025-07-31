import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  BarChart,
  Activity,
  Filter,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartCard from "./ChartCard";

interface DataVisualizationProps {
  className?: string;
}

const DataVisualization = ({ className = "" }: DataVisualizationProps) => {
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState("occupancy");

  // Mock data for charts
  const occupancyData = {
    title: "Room Occupancy",
    subtitle: "Current occupancy rate across all room types",
    value: "78%",
    trend: "+12%",
    trendDirection: "up",
    chartType: "line",
  };

  const revenueData = {
    title: "Total Revenue",
    subtitle: "Revenue generated across all services",
    value: "$128,450",
    trend: "+8%",
    trendDirection: "up",
    chartType: "bar",
  };

  const bookingsData = {
    title: "New Bookings",
    subtitle: "Bookings made in the selected period",
    value: "342",
    trend: "+5%",
    trendDirection: "up",
    chartType: "line",
  };

  const avgStayData = {
    title: "Average Stay",
    subtitle: "Average length of guest stays",
    value: "3.2 days",
    trend: "-0.5 days",
    trendDirection: "down",
    chartType: "bar",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full bg-black/20 backdrop-blur-md rounded-xl border border-white/10 p-6 ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233b82f6' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundSize: "100px 100px",
      }}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Performance Analytics
            </h2>
            <p className="text-gray-400 mt-1">
              Real-time insights into hotel performance metrics
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2 border border-white/5">
              <Filter className="h-4 w-4 text-blue-400" />
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px] bg-transparent border-0 focus:ring-0 focus:ring-offset-0 text-sm text-gray-300">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2 border border-white/5">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">
                Apr 1 - Apr 30, 2023
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-black/40 border border-white/10 mb-6">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="occupancy"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <LineChart className="h-4 w-4 mr-2" />
              Occupancy
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <BarChart className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard
                title={occupancyData.title}
                subtitle={occupancyData.subtitle}
                value={occupancyData.value}
                trend={occupancyData.trend}
                trendDirection={occupancyData.trendDirection}
                chartType={occupancyData.chartType}
              />
              <ChartCard
                title={revenueData.title}
                subtitle={revenueData.subtitle}
                value={revenueData.value}
                trend={revenueData.trend}
                trendDirection={revenueData.trendDirection}
                chartType={revenueData.chartType}
              />
            </div>
          </TabsContent>

          <TabsContent value="occupancy" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard
                title={occupancyData.title}
                subtitle={occupancyData.subtitle}
                value={occupancyData.value}
                trend={occupancyData.trend}
                trendDirection={occupancyData.trendDirection}
                chartType={occupancyData.chartType}
                expanded={true}
              />
              <ChartCard
                title={bookingsData.title}
                subtitle={bookingsData.subtitle}
                value={bookingsData.value}
                trend={bookingsData.trend}
                trendDirection={bookingsData.trendDirection}
                chartType={bookingsData.chartType}
              />
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard
                title={revenueData.title}
                subtitle={revenueData.subtitle}
                value={revenueData.value}
                trend={revenueData.trend}
                trendDirection={revenueData.trendDirection}
                chartType={revenueData.chartType}
                expanded={true}
              />
              <ChartCard
                title={avgStayData.title}
                subtitle={avgStayData.subtitle}
                value={avgStayData.value}
                trend={avgStayData.trend}
                trendDirection={avgStayData.trendDirection}
                chartType={avgStayData.chartType}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            View Detailed Reports
          </Button>
        </div>
      </div>

      {/* Particle effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DataVisualization;
