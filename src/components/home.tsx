import React, { useState, useEffect } from "react";
import {
  Zap,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  Star,
  Plus,
  ArrowUpRight,
  Activity,
  DollarSign,
  Search,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Settings,
  BarChart3,
  PieChart,
  Wifi,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DataVisualization from "./Dashboard/DataVisualization";
import RoomCarousel from "./Dashboard/RoomCarousel";
import RoomBookingModal from "./RoomBookingModal";

const Home = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("today");
  const [realTimeData, setRealTimeData] = useState({
    occupancy: 78,
    revenue: 12845,
    checkIns: 24,
    maintenance: 7,
    lastUpdate: new Date().toLocaleTimeString(),
  });

  const promotions = [
    {
      text: "🎉 Special Winter Offer: 30% off luxury suites - Book now!",
      color: "from-blue-500 to-violet-600",
      icon: "🎉",
    },
    {
      text: "⭐ New Premium Spa Services Available - Experience luxury",
      color: "from-teal-500 to-emerald-600",
      icon: "⭐",
    },
    {
      text: "🍽️ Complimentary breakfast with weekend bookings",
      color: "from-amber-500 to-orange-600",
      icon: "🍽️",
    },
    {
      text: "🏨 Upgrade to premium rooms at no extra cost this month",
      color: "from-red-500 to-pink-600",
      icon: "🏨",
    },
  ];

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  // Auto-rotate promotions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromotion((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  // Real-time data updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        occupancy: Math.max(
          60,
          Math.min(95, prev.occupancy + (Math.random() - 0.5) * 2),
        ),
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        checkIns: Math.max(
          0,
          prev.checkIns + Math.floor((Math.random() - 0.7) * 3),
        ),
        maintenance: Math.max(
          0,
          prev.maintenance + Math.floor((Math.random() - 0.8) * 2),
        ),
        lastUpdate: new Date().toLocaleTimeString(),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-circuit opacity-10" />
        <div className="absolute inset-0 bg-noise opacity-5" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background:
                i % 3 === 0 ? "#8A2BE2" : i % 3 === 1 ? "#00CED1" : "#FF4500",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Promotion Banner */}
      <div className="relative z-10 bg-gradient-to-r from-indigo-900/80 to-violet-900/80 backdrop-blur-md py-3 px-4 text-center border-b border-violet-500/20">
        <div className="absolute inset-0 bg-circuit opacity-20" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromotion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-sm md:text-base font-medium relative z-10"
          >
            <span className="text-2xl">
              {promotions[currentPromotion].icon}
            </span>
            <span className="bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              {promotions[currentPromotion].text}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
          {promotions.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentPromotion(idx)}
              className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                idx === currentPromotion
                  ? "bg-teal-400 scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-neon/20 bg-black/80 backdrop-blur-md sticky top-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90" />
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60">
          <motion.div
            className="h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ["-100px", "calc(100vw + 100px)"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-neon" />
              <motion.div
                className="absolute inset-0 bg-neon rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <div className="text-2xl font-bold">
                <span className="neon-text">CYBER</span>
                <span className="text-white mx-1">|</span>
                <span className="teal-glow">HOTEL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Wifi className="h-3 w-3 text-teal" />
                <span>ONLINE</span>
                <Shield className="h-3 w-3 text-neon" />
                <span>SECURE</span>
                <Activity className="h-3 w-3 text-flame" />
                <span>ACTIVE</span>
              </div>
            </div>
          </motion.div>

          {/* Search - hidden on mobile */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search rooms, bookings, guests..."
                className="cyber-input pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              {/* Search glow effect */}
              <motion.div
                className="absolute inset-0 rounded-md border border-teal opacity-0 pointer-events-none"
                animate={
                  searchQuery ? { opacity: [0, 0.5, 0] } : { opacity: 0 }
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Nav Links - desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Clock className="h-3 w-3 text-teal" />
              <span className="font-mono">{realTimeData.lastUpdate}</span>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-neon/10 hover:text-neon transition-all duration-300"
                >
                  <Bell className="h-5 w-5" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-flame text-black text-xs">
                      3
                    </Badge>
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-teal/10 hover:text-teal transition-all duration-300"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Avatar className="h-10 w-10 border-2 border-neon/50">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback className="bg-neon text-black font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-medium text-white">System Admin</p>
                  <p className="text-xs text-gray-400">admin@cyberhotel.com</p>
                </div>
              </motion.div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile search - only visible on mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="bg-gray-800/50 border-gray-700 text-gray-200 pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <nav className="flex flex-col py-3">
              <a href="#" className="px-4 py-2 hover:bg-gray-800">
                Dashboard
              </a>
              <a href="#" className="px-4 py-2 hover:bg-gray-800">
                Bookings
              </a>
              <a href="#" className="px-4 py-2 hover:bg-gray-800">
                Rooms
              </a>
              <a href="#" className="px-4 py-2 hover:bg-gray-800">
                Services
              </a>
              <div className="border-t border-gray-800 mt-2 pt-2 px-4 flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=manager" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">Hotel Manager</p>
                  <p className="text-xs text-gray-400">manager@novastay.com</p>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome to NovaStay Dashboard
          </h1>
          <p className="text-gray-400">
            Your hotel management hub with real-time insights and controls
          </p>
        </div>

        {/* Real-time Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {[
            {
              label: "Occupancy Rate",
              value: `${Math.round(realTimeData.occupancy)}%`,
              change: "+5%",
              color: "from-blue-500 to-violet-600",
              icon: BarChart3,
              trend: "up",
            },
            {
              label: "Revenue Today",
              value: `${realTimeData.revenue.toLocaleString()}`,
              change: "+12%",
              color: "from-teal-500 to-emerald-600",
              icon: DollarSign,
              trend: "up",
            },
            {
              label: "Pending Check-ins",
              value: realTimeData.checkIns.toString(),
              change: "-3",
              color: "from-amber-500 to-orange-600",
              icon: Users,
              trend: "down",
            },
            {
              label: "Maintenance Requests",
              value: realTimeData.maintenance.toString(),
              change: "+2",
              color: "from-red-500 to-pink-600",
              icon: AlertTriangle,
              trend: "up",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="cyber-card p-6 relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-10 ${stat.color} group-hover:opacity-20 transition-opacity`}
                />

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-transparent"
                  style={{
                    background: `linear-gradient(45deg, transparent, ${stat.color.includes("blue") ? "#8A2BE2" : stat.color.includes("teal") ? "#00CED1" : stat.color.includes("amber") ? "#FF4500" : "#8A2BE2"}, transparent)`,
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                    <motion.div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        stat.trend === "up"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.change}
                    </motion.div>
                  </div>

                  <p className="text-gray-400 text-sm uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <motion.p
                    className="text-3xl font-bold mt-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-teal-400 transition-all"
                    key={stat.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs mt-2 text-gray-500">
                    Last updated: {realTimeData.lastUpdate}
                  </p>
                </div>

                {/* Particle effects on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <TabsList className="bg-black/40 border border-neon/20 backdrop-blur-md">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-neon/20 data-[state=active]:text-neon"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-teal/20 data-[state=active]:text-teal"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="data-[state=active]:bg-flame/20 data-[state=active]:text-flame"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px] cyber-input">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-neon/30">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal/30 text-teal hover:bg-teal/10"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="mt-0">
              <DataVisualization />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataVisualization />
                <div className="cyber-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Average Daily Rate",
                        value: "$245",
                        change: "+8%",
                      },
                      {
                        label: "Revenue Per Room",
                        value: "$189",
                        change: "+12%",
                      },
                      {
                        label: "Guest Satisfaction",
                        value: "4.8/5",
                        change: "+0.2",
                      },
                      {
                        label: "Booking Conversion",
                        value: "23%",
                        change: "+5%",
                      },
                    ].map((metric, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-black/30 rounded-lg"
                      >
                        <span className="text-gray-300">{metric.label}</span>
                        <div className="text-right">
                          <div className="text-white font-bold">
                            {metric.value}
                          </div>
                          <div className="text-xs text-green-400">
                            {metric.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Generate Reports
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Occupancy Report",
                      desc: "Detailed room occupancy analysis",
                    },
                    {
                      name: "Revenue Report",
                      desc: "Financial performance breakdown",
                    },
                    {
                      name: "Guest Analytics",
                      desc: "Customer behavior insights",
                    },
                  ].map((report, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-teal/50 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="font-semibold text-white">
                        {report.name}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {report.desc}
                      </p>
                      <Button size="sm" className="mt-3 w-full cyber-button">
                        Generate
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Enhanced Room Categories Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Featured Room Categories
              </h2>
              <p className="text-gray-400 mt-1">
                Discover our premium accommodations with advanced amenities
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-teal/20 text-teal border-teal/30">
                Live Availability
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="border-neon/30 text-neon hover:bg-neon/10"
                onClick={() => setBookingModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>

          <RoomCarousel onRoomSelect={handleRoomSelect} />
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "New Booking",
                icon: Calendar,
                color: "bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30",
                action: () => setBookingModalOpen(true),
              },
              {
                name: "Check-in Guest",
                icon: Users,
                color:
                  "bg-green-500/20 border-green-500/30 hover:bg-green-500/30",
                action: () => {},
              },
              {
                name: "Room Service",
                icon: Star,
                color:
                  "bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30",
                action: () => {},
              },
              {
                name: "Maintenance",
                icon: Settings,
                color: "bg-red-500/20 border-red-500/30 hover:bg-red-500/30",
                action: () => {},
              },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className={`h-24 w-full flex flex-col items-center justify-center gap-3 ${action.color} transition-all duration-300 relative overflow-hidden group`}
                    onClick={action.action}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{action.name}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-black/80 border-t border-neon/20 py-8 mt-12 backdrop-blur-md">
        <div className="absolute inset-0 bg-circuit opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-neon" />
                <div>
                  <h3 className="text-xl font-bold">
                    <span className="neon-text">CYBER</span>
                    <span className="text-white mx-1">|</span>
                    <span className="teal-glow">HOTEL</span>
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Management System
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Advanced hotel management system with futuristic interface and
                powerful real-time features. Experience the future of
                hospitality management.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-teal" />
                  <span>Neo Tokyo, Sector 7</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-neon" />
                  <span>+1 (555) CYBER-01</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-flame" />
                  <span>info@cyberhotel.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Access
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Dashboard", active: true },
                  { name: "Bookings", active: false },
                  { name: "Room Management", active: false },
                  { name: "Analytics", active: false },
                  { name: "Reports", active: false },
                ].map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className={`flex items-center gap-2 transition-colors ${
                        link.active
                          ? "text-teal-400"
                          : "text-gray-400 hover:text-teal-400"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${
                          link.active ? "bg-teal-400" : "bg-gray-600"
                        }`}
                      />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                System Status
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  {
                    label: "Network",
                    status: "Online",
                    color: "text-green-400",
                  },
                  {
                    label: "Security",
                    status: "Secure",
                    color: "text-blue-400",
                  },
                  {
                    label: "Database",
                    status: "Active",
                    color: "text-teal-400",
                  },
                  {
                    label: "API",
                    status: "Operational",
                    color: "text-green-400",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${item.color.replace("text-", "bg-")}`}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className={item.color}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-neon/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 CyberHotel Management System. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span>Powered by</span>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-neon" />
                <span className="text-neon font-semibold">QUANTUM TECH</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <RoomBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        room={selectedRoom}
      />
    </div>
  );
};

export default Home;
