"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Mock data for favorites
const mockFavorites = [
  {
    id: "1",
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "/images/destinations/eiffel-tower.jpg",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Santorini",
    location: "Greece",
    image: "/images/destinations/santorini.jpg",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Kyoto",
    location: "Japan",
    image: "/images/destinations/kyoto.jpg",
    rating: 4.7,
  },
];

// Mock data for achievements
const mockAchievements = [
  {
    id: "1",
    name: "Explorer Novice",
    description: "Visited 5 destinations",
    icon: "",
    progress: 100,
  },
  {
    id: "2",
    name: "Cultural Enthusiast",
    description: "Explored 3 historical sites",
    icon: "",
    progress: 60,
  },
  {
    id: "3",
    name: "Adventure Seeker",
    description: "Completed 2 adventure experiences",
    icon: "",
    progress: 40,
  },
  {
    id: "4",
    name: "Photo Master",
    description: "Captured 10 panoramic views",
    icon: "",
    progress: 20,
  },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("favorites");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the user is not authenticated, redirect to sign in
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

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
        <h1 className="mb-4 text-4xl font-bold">My Profile</h1>
        <p className="text-gray-400">Manage your virtual travel experiences</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Profile Sidebar */}
        <div className="rounded-xl bg-gray-900/60 p-6 backdrop-blur-sm">
          <div className="mb-6 flex flex-col items-center">
            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-blue-500">
              <Image
                src={session?.user?.image || "https://ui-avatars.com/api/?name=User&background=random"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mb-1 text-xl font-semibold">{session?.user?.name || "User"}</h2>
            <p className="text-sm text-gray-400">{session?.user?.email}</p>
          </div>

          <div className="mb-6 space-y-4">
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                activeTab === "favorites"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">❤️</span>
              <span>My Favorites</span>
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                activeTab === "achievements"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">🏆</span>
              <span>Achievements</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">⚙️</span>
              <span>Settings</span>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <Link
              href="/auth/signout"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-400 transition hover:bg-gray-800"
            >
              <span className="mr-2">🚪</span>
              <span>Sign Out</span>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="rounded-xl bg-gray-900/60 p-6 backdrop-blur-sm">
          {activeTab === "favorites" && (
            <div>
              <h3 className="mb-6 text-2xl font-semibold">My Favorite Destinations</h3>
              {mockFavorites.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {mockFavorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="group overflow-hidden rounded-lg bg-gray-800 transition hover:shadow-lg"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={favorite.image}
                          alt={favorite.name}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-110"
                        />
                        <button className="absolute top-3 right-3 rounded-full bg-gray-900/60 p-2 text-red-400 backdrop-blur-sm">
                          ❤️
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="mb-1 text-lg font-medium">{favorite.name}</h4>
                        <div className="mb-3 flex items-center gap-1 text-sm text-gray-400">
                          <span>📍</span>
                          <span>{favorite.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <span>⭐</span>
                          <span>{favorite.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 text-center">
                  <div className="mb-4 text-4xl">❤️</div>
                  <h4 className="mb-2 text-xl font-medium">No favorites yet</h4>
                  <p className="mb-4 text-gray-400">
                    Explore destinations and add them to your favorites
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
          )}

          {activeTab === "achievements" && (
            <div>
              <h3 className="mb-6 text-2xl font-semibold">My Achievements</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 rounded-lg bg-gray-800 p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-2xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-gray-400">
                        {achievement.description}
                      </p>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 className="mb-6 text-2xl font-semibold">Account Settings</h3>
              <div className="space-y-6 rounded-lg bg-gray-800 p-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={session?.user?.name || ""}
                    className="w-full rounded-lg border-0 bg-gray-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={session?.user?.email || ""}
                    className="w-full rounded-lg border-0 bg-gray-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border-0 bg-gray-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border-0 bg-gray-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
