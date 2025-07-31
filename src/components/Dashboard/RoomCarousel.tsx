import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  occupancy: number;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

interface RoomCarouselProps {
  title?: string;
  rooms?: Room[];
  onRoomSelect?: (room: Room) => void;
}

const RoomCarousel = ({
  title = "Featured Rooms",
  rooms = [
    {
      id: "1",
      name: "Neon Suite",
      category: "Premium",
      price: 299,
      occupancy: 2,
      amenities: ["Smart Controls", "Holographic TV", "Ambient Lighting"],
      imageUrl:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      available: true,
    },
    {
      id: "2",
      name: "Cyber Deluxe",
      category: "Deluxe",
      price: 199,
      occupancy: 2,
      amenities: ["Smart Controls", "Ambient Lighting"],
      imageUrl:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      available: true,
    },
    {
      id: "3",
      name: "Tech Studio",
      category: "Standard",
      price: 149,
      occupancy: 1,
      amenities: ["Smart Controls"],
      imageUrl:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
      available: false,
    },
    {
      id: "4",
      name: "Quantum Suite",
      category: "Premium",
      price: 349,
      occupancy: 4,
      amenities: [
        "Smart Controls",
        "Holographic TV",
        "Ambient Lighting",
        "AI Concierge",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&q=80",
      available: true,
    },
    {
      id: "5",
      name: "Digital Loft",
      category: "Deluxe",
      price: 229,
      occupancy: 3,
      amenities: ["Smart Controls", "Ambient Lighting", "AI Concierge"],
      imageUrl:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      available: true,
    },
  ],
  onRoomSelect = () => {},
}: RoomCarouselProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const categories = [
    "All",
    ...Array.from(new Set(rooms.map((room) => room.category))),
  ];

  const filteredRooms =
    activeFilter === "All"
      ? rooms
      : rooms.filter((room) => room.category === activeFilter);

  // Particle animation variants
  const particleVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.2, 0.8, 0.2],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className="w-full bg-black bg-opacity-80 rounded-xl p-6 backdrop-blur-md border border-teal-500/20 relative overflow-hidden">
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
              d="M10 10 H90 V90 H10 Z"
              fill="none"
              stroke="#4fd1c5"
              strokeWidth="0.5"
            />
            <circle cx="10" cy="10" r="2" fill="#4fd1c5" />
            <circle cx="90" cy="90" r="2" fill="#4fd1c5" />
            <path
              d="M10 50 H40 V90"
              fill="none"
              stroke="#4fd1c5"
              strokeWidth="0.5"
            />
            <path
              d="M50 10 V40 H90"
              fill="none"
              stroke="#4fd1c5"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Animated particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-teal-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          variants={particleVariants}
          animate="animate"
          custom={i}
        />
      ))}

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-2xl font-bold text-white">
          <span className="text-teal-400">{title}</span>
          <span className="ml-2 text-sm text-teal-400/70">
            {filteredRooms.length} rooms
          </span>
        </h2>

        <div className="flex items-center gap-4">
          {/* Category filter on desktop */}
          <div className="hidden md:flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={`border-teal-500/50 ${activeFilter === category ? "bg-teal-500 text-black" : "text-teal-400 hover:text-teal-300"}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Dropdown filter for mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-teal-500/50 text-teal-400"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gray-900 border-teal-500/50"
              >
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`${activeFilter === category ? "bg-teal-500/20 text-teal-400" : "text-gray-200"}`}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {filteredRooms.map((room) => (
            <CarouselItem
              key={room.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full">
                <Card className="h-full bg-gray-900/70 border-teal-500/20 overflow-hidden hover:border-teal-400/50 transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`${room.available ? "bg-teal-500" : "bg-red-500"} text-black`}
                        >
                          {room.available ? "Available" : "Booked"}
                        </Badge>
                        <span className="text-white font-bold">
                          ${room.price}
                          <span className="text-xs">/night</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {room.category} • {room.occupancy}{" "}
                        {room.occupancy > 1 ? "Guests" : "Guest"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {room.amenities.map((amenity, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-teal-500/30 text-teal-400/80"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full mt-4 bg-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-black transition-colors border border-teal-500/30"
                      onClick={() => onRoomSelect(room)}
                      disabled={!room.available}
                    >
                      {room.available ? "View Details" : "Not Available"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex justify-center gap-2">
          <CarouselPrevious className="relative static bg-gray-800 border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-black" />
          <CarouselNext className="relative static bg-gray-800 border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-black" />
        </div>
      </Carousel>
    </div>
  );
};

export default RoomCarousel;
