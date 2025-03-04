"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    destination: "Eiffel Tower",
    location: "Paris, France",
    image: "/images/destinations/eiffel-tower.jpg",
    date: "2023-12-15",
    time: "14:00",
    duration: "60 min",
    status: "upcoming",
  },
  {
    id: "2",
    destination: "Santorini",
    location: "Greece",
    image: "/images/destinations/santorini.jpg",
    date: "2023-12-20",
    time: "10:30",
    duration: "45 min",
    status: "upcoming",
  },
  {
    id: "3",
    destination: "Kyoto",
    location: "Japan",
    image: "/images/destinations/kyoto.jpg",
    date: "2023-11-05",
    time: "16:00",
    duration: "90 min",
    status: "completed",
  },
];

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // If the user is not authenticated, redirect to sign in
    if (status === "unauthenticated") {
      toast.error("You must be signed in to view bookings");
      router.push("/auth/signin?callbackUrl=/bookings");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  const cancelBooking = (id: string) => {
    toast.success(`Booking cancelled successfully`);
    // In a real app, this would call an API to cancel the booking
  };

  const filteredBookings = filter === "all" 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === filter);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">My Bookings</h1>
        <p className="text-gray-400">Manage your virtual travel experiences</p>
      </div>

      <div className="mb-8 flex justify-center space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`rounded-lg px-4 py-2 ${
            filter === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`rounded-lg px-4 py-2 ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {filteredBookings.length > 0 ? (
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="overflow-hidden rounded-lg bg-gray-900/60 backdrop-blur-sm md:flex"
            >
              <div className="relative h-48 w-full md:h-auto md:w-64 md:flex-shrink-0">
                <Image
                  src={booking.image}
                  alt={booking.destination}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{booking.destination}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "upcoming"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {booking.status === "upcoming" ? "Upcoming" : "Completed"}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-400">
                    <span>📍</span> {booking.location}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="font-medium">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Time</p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-medium">{booking.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {booking.status === "upcoming" && (
                    <>
                      <Link
                        href={`/experience/${booking.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                      >
                        Start Experience
                      </Link>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600/30"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <>
                      <Link
                        href={`/experience/${booking.id}`}
                        className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Revisit Experience
                      </Link>
                      <button
                        className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Leave Review
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 text-center">
          <div className="mb-4 text-4xl">📅</div>
          <h4 className="mb-2 text-xl font-medium">No bookings found</h4>
          <p className="mb-4 text-gray-400">
            {filter === "all"
              ? "You haven't booked any virtual travel experiences yet"
              : filter === "upcoming"
              ? "You don't have any upcoming bookings"
              : "You don't have any completed experiences"}
          </p>
          <Link
            href="/destinations"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Explore Destinations
          </Link>
        </div>
      )}
    </div>
  );
}
