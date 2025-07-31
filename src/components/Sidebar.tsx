import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bed,
  Calendar,
  Users,
  MessageSquare,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({
  isCollapsed = false,
  onToggle = () => {},
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, badge: null, color: "neon" },
    { name: "Rooms", icon: Bed, badge: "120", color: "teal" },
    { name: "Bookings", icon: Calendar, badge: "24", color: "flame" },
    { name: "Users", icon: Users, badge: "1.2k", color: "neon" },
    { name: "Complaints", icon: MessageSquare, badge: "7", color: "flame" },
    { name: "Feedback", icon: Star, badge: "34", color: "teal" },
    { name: "Settings", icon: Settings, badge: null, color: "neon" },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = "transition-all duration-300";

    if (isActive) {
      switch (color) {
        case "neon":
          return `${baseClasses} text-neon bg-neon bg-opacity-10 border-neon border-opacity-50 shadow-neon-sm`;
        case "teal":
          return `${baseClasses} text-teal bg-teal bg-opacity-10 border-teal border-opacity-50 shadow-teal-sm`;
        case "flame":
          return `${baseClasses} text-flame bg-flame bg-opacity-10 border-flame border-opacity-50`;
        default:
          return `${baseClasses} text-white bg-white bg-opacity-10`;
      }
    }

    return `${baseClasses} text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5`;
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="cyber-sidebar h-full flex flex-col relative overflow-hidden"
    >
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      {/* Animated particles */}
      <div className="particle-field">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="p-6 border-b border-neon border-opacity-20 relative z-10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <Zap className="h-8 w-8 text-neon" />
              <div>
                <h2 className="neon-text text-xl font-extrabold tracking-wide">
                  CYBER
                </h2>
                <p className="text-xs text-teal uppercase tracking-widest">
                  Hotel Admin
                </p>
              </div>
            </motion.div>
          )}

          {isCollapsed && <Zap className="h-8 w-8 text-neon mx-auto" />}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <motion.button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border ${getColorClasses(item.color, isActive)} group relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <Icon className="h-5 w-5 flex-shrink-0" />

              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 flex items-center justify-between"
                >
                  <span className="font-medium text-sm uppercase tracking-wide">
                    {item.name}
                  </span>
                  {item.badge && (
                    <Badge
                      className={`text-xs px-2 py-1 ${
                        item.color === "neon"
                          ? "bg-neon text-black"
                          : item.color === "teal"
                            ? "bg-teal text-black"
                            : "bg-flame text-black"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </motion.div>
              )}

              {isCollapsed && item.badge && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-flame rounded-full" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-neon border-opacity-20 relative z-10">
        <Button
          onClick={onToggle}
          variant="outline"
          size="sm"
          className="w-full border-neon border-opacity-30 text-neon hover:bg-neon hover:bg-opacity-10 hover:text-neon-light"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-2 right-2">
        <motion.div
          className="w-2 h-2 bg-teal rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.aside>
  );
};

export default Sidebar;
