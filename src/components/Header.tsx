import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Zap,
  Wifi,
  Shield,
  Activity,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, type: "booking", message: "New booking received", time: "2m ago" },
    {
      id: 2,
      type: "maintenance",
      message: "Room 205 maintenance complete",
      time: "15m ago",
    },
    {
      id: 3,
      type: "complaint",
      message: "Guest complaint resolved",
      time: "1h ago",
    },
  ]);

  const systemStatus = {
    network: "online",
    security: "secure",
    performance: "optimal",
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`cyber-header px-6 py-4 flex items-center justify-between relative overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      {/* Data stream animation */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent opacity-60">
        <motion.div
          className="h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ["-100px", "calc(100vw + 100px)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Left Section - Title and Status */}
      <div className="flex items-center space-x-6 relative z-10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            <span className="neon-text">CYBER</span>
            <span className="text-white mx-2">|</span>
            <span className="teal-glow">Hotel Management</span>
          </h1>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1">
              <Wifi className="h-3 w-3 text-teal" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {systemStatus.network}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-neon" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {systemStatus.security}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-3 w-3 text-flame" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {systemStatus.performance}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8 relative z-10">
        <div className="relative">
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
            animate={searchQuery ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Right Section - Actions and Profile */}
      <div className="flex items-center space-x-4 relative z-10">
        {/* System Time */}
        <div className="hidden md:block text-right">
          <div className="text-sm font-mono text-teal">
            {new Date().toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            System Time
          </div>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-neon hover:bg-opacity-10 hover:text-neon transition-all duration-300"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-flame text-black text-xs">
                    {notifications.length}
                  </Badge>
                </motion.div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-cyber-gray-900 border-neon border-opacity-30 backdrop-blur-md"
          >
            <div className="p-3 border-b border-neon border-opacity-20">
              <h3 className="font-semibold text-white">Notifications</h3>
              <p className="text-xs text-gray-400">
                You have {notifications.length} unread messages
              </p>
            </div>
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="p-3 hover:bg-neon hover:bg-opacity-10 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-teal hover:bg-opacity-10 hover:text-teal transition-all duration-300"
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-3 hover:bg-neon hover:bg-opacity-10 px-3"
            >
              <Avatar className="h-8 w-8 border-2 border-neon border-opacity-50">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback className="bg-neon text-black font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">System Admin</p>
                <p className="text-xs text-gray-400">admin@cyberhotel.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-cyber-gray-900 border-neon border-opacity-30 backdrop-blur-md"
          >
            <DropdownMenuItem className="hover:bg-neon hover:bg-opacity-10">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-teal hover:bg-opacity-10">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neon bg-opacity-20" />
            <DropdownMenuItem className="hover:bg-flame hover:bg-opacity-10 text-flame">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
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
    </motion.header>
  );
};

export default Header;
