import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import DataVisualization from "./Dashboard/DataVisualization";
import RoomCarousel from "./Dashboard/RoomCarousel";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock promotion data
  const promotions = [
    { id: 1, text: "🔥 Summer Special: 25% off on Executive Suites" },
    { id: 2, text: "✨ New Spa Services Available - Book Now" },
    { id: 3, text: "🎉 Weekend Package: Stay 2 Nights, Get 1 Free" },
  ];

  const [currentPromotion, setCurrentPromotion] = useState(0);

  // Auto-rotate promotions
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromotion((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Promotion Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-violet-900 py-2 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Circuit pattern background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=20')] bg-repeat opacity-10"></div>
        </div>
        <motion.div
          key={currentPromotion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base font-medium"
        >
          {promotions[currentPromotion].text}
        </motion.div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
          {promotions.map((_, idx) => (
            <span
              key={idx}
              className={`block h-1.5 w-1.5 rounded-full ${idx === currentPromotion ? "bg-teal-400" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              NOVA<span className="text-violet-400">STAY</span>
            </div>
          </div>

          {/* Search - hidden on mobile */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-8">
            <Input
              type="text"
              placeholder="Search rooms, services, amenities..."
              className="bg-gray-800/50 border-gray-700 text-gray-200 pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Nav Links - desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              Bookings
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              Rooms
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              Services
            </a>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-violet-500">
                  3
                </Badge>
              </Button>

              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=manager" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Occupancy Rate",
              value: "78%",
              change: "+5%",
              color: "from-blue-500 to-violet-600",
            },
            {
              label: "Revenue Today",
              value: "$12,845",
              change: "+12%",
              color: "from-teal-500 to-emerald-600",
            },
            {
              label: "Pending Check-ins",
              value: "24",
              change: "-3",
              color: "from-amber-500 to-orange-600",
            },
            {
              label: "Maintenance Requests",
              value: "7",
              change: "+2",
              color: "from-red-500 to-pink-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-xl p-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 ${stat.color}"></div>
              <div className="relative z-10">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p
                  className={`text-xs mt-2 ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                >
                  {stat.change} from yesterday
                </p>
              </div>
              <div className="absolute bottom-0 right-0 h-16 w-16 opacity-10">
                <div className="h-full w-full bg-gradient-to-br ${stat.color} rounded-tl-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Visualization Section */}
        <DataVisualization />

        {/* Room Categories Section */}
        <div className="mt-10 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Room Categories</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          <RoomCarousel />
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "New Booking",
                icon: "🗓️",
                color: "bg-blue-500/20 border-blue-500/30",
              },
              {
                name: "Check-in Guest",
                icon: "🔑",
                color: "bg-green-500/20 border-green-500/30",
              },
              {
                name: "Room Service",
                icon: "🍽️",
                color: "bg-amber-500/20 border-amber-500/30",
              },
              {
                name: "Maintenance",
                icon: "🔧",
                color: "bg-red-500/20 border-red-500/30",
              },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto py-6 flex flex-col items-center justify-center ${action.color} hover:bg-gray-800/50`}
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <span>{action.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                NOVASTAY
              </h3>
              <p className="text-gray-400 text-sm">
                Advanced hotel management system with futuristic interface and
                powerful features.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Bookings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Room Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Reports
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>
              © 2023 NovaStay Hotel Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
