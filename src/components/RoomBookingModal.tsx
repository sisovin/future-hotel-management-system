import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  Users,
  CreditCard,
  Mail,
  Phone,
  User,
  MapPin,
  Check,
  X,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.string().min(1, "Number of guests is required"),
  roomType: z.string().min(1, "Room type is required"),
  specialRequests: z.string().optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface RoomBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room?: {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
  };
}

const RoomBookingModal = ({ isOpen, onClose, room }: RoomBookingModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "1",
      roomType: room?.category || "",
      specialRequests: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingComplete(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setBookingComplete(false);
      setStep(1);
      form.reset();
      onClose();
    }, 3000);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  if (bookingComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-cyber-gray-900 border-neon border-opacity-50 backdrop-blur-md">
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mx-auto w-16 h-16 bg-teal bg-opacity-20 rounded-full flex items-center justify-center mb-4"
            >
              <Check className="h-8 w-8 text-teal" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Booking Confirmed!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400"
            >
              Your reservation has been successfully created.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 text-sm text-teal"
            >
              Confirmation details sent to your email.
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-cyber-gray-900 border-neon border-opacity-50 backdrop-blur-md max-h-[90vh] overflow-y-auto scrollbar-cyber">
        {/* Animated background */}
        <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <DialogHeader className="relative z-10">
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Zap className="h-6 w-6 text-neon mr-2" />
            <span className="neon-text">CYBER</span>
            <span className="text-white mx-2">|</span>
            <span className="teal-glow">Room Booking</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete your reservation in {3 - step + 1} simple steps
          </DialogDescription>

          {/* Progress indicator */}
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stepNum <= step
                      ? "bg-neon text-black"
                      : "bg-cyber-gray-700 text-gray-400"
                  }`}
                  animate={stepNum === step ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {stepNum}
                </motion.div>
                {stepNum < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      stepNum < step ? "bg-neon" : "bg-cyber-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 relative z-10"
          >
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <User className="h-5 w-5 text-teal mr-2" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="cyber-input"
                            placeholder="Enter your first name"
                          />
                        </FormControl>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="cyber-input"
                            placeholder="Enter your last name"
                          />
                        </FormControl>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="cyber-input"
                            placeholder="your.email@example.com"
                          />
                        </FormControl>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="cyber-input"
                            placeholder="+1 (555) 123-4567"
                          />
                        </FormControl>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Booking Details */}
            {step === 2 && (
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Calendar className="h-5 w-5 text-teal mr-2" />
                  Booking Details
                </h3>

                {room && (
                  <div className="cyber-card p-4 mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={room.imageUrl}
                        alt={room.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {room.name}
                        </h4>
                        <p className="text-sm text-gray-400">{room.category}</p>
                        <Badge className="bg-teal text-black mt-1">
                          ${room.price}/night
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide">
                          Check-in Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            className="cyber-input"
                          />
                        </FormControl>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide">
                          Check-out Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            className="cyber-input"
                          />
                        </FormControl>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm uppercase tracking-wide flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Guests
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="cyber-input">
                              <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-cyber-gray-800 border-neon border-opacity-30">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Guest" : "Guests"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-flame text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm uppercase tracking-wide">
                        Special Requests (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="cyber-input min-h-[80px]"
                          placeholder="Any special requests or preferences..."
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Let us know about any special accommodations you need.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <CreditCard className="h-5 w-5 text-teal mr-2" />
                  Confirmation
                </h3>

                <div className="cyber-card p-6 space-y-4">
                  <h4 className="font-semibold text-white border-b border-neon border-opacity-20 pb-2">
                    Booking Summary
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide">
                        Guest Name
                      </p>
                      <p className="text-white font-medium">
                        {form.watch("firstName")} {form.watch("lastName")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-white font-medium">
                        {form.watch("email")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide">
                        Check-in
                      </p>
                      <p className="text-white font-medium">
                        {form.watch("checkIn")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide">
                        Check-out
                      </p>
                      <p className="text-white font-medium">
                        {form.watch("checkOut")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide">
                        Guests
                      </p>
                      <p className="text-white font-medium">
                        {form.watch("guests")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide">
                        Room Type
                      </p>
                      <p className="text-white font-medium">
                        {form.watch("roomType")}
                      </p>
                    </div>
                  </div>

                  {form.watch("specialRequests") && (
                    <div>
                      <p className="text-gray-400 uppercase tracking-wide text-sm">
                        Special Requests
                      </p>
                      <p className="text-white text-sm">
                        {form.watch("specialRequests")}
                      </p>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-neon border-opacity-50 data-[state=checked]:bg-neon data-[state=checked]:text-black"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-300">
                          I agree to the{" "}
                          <span className="text-teal hover:underline cursor-pointer">
                            Terms and Conditions
                          </span>{" "}
                          and{" "}
                          <span className="text-teal hover:underline cursor-pointer">
                            Privacy Policy
                          </span>
                        </FormLabel>
                        <FormMessage className="text-flame text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-neon border-opacity-20">
              <Button
                type="button"
                variant="outline"
                onClick={step === 1 ? onClose : prevStep}
                className="border-cyber-gray-600 text-gray-300 hover:bg-cyber-gray-800"
              >
                {step === 1 ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  "Previous"
                )}
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="cyber-button"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyber-button min-w-[120px]"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomBookingModal;
