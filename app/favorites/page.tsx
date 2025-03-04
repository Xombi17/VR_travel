"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the user is not authenticated, redirect to sign in
    if (status === "unauthenticated") {
      toast.error("You must be signed in to view favorites");
      router.push("/auth/signin?callbackUrl=/favorites");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  const removeFavorite = (id: string) => {
    toast.success(`Removed from favorites`);
    // In a real app, this would call an API to remove the favorite
  };

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
        <h1 className="mb-4 text-4xl font-bold">My Favorites</h1>
        <p className="text-gray-400">Your saved virtual travel destinations</p>
      </div>

      {mockFavorites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockFavorites.map((favorite) => (
            <div
              key={favorite.id}
              className="group overflow-hidden rounded-lg bg-gray-900/60 transition hover:shadow-lg backdrop-blur-sm"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={favorite.image}
                  alt={favorite.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-110"
                />
                <button 
                  className="absolute top-3 right-3 rounded-full bg-gray-900/60 p-2 text-red-400 backdrop-blur-sm"
                  onClick={() => removeFavorite(favorite.id)}
                >
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
                <div className="mt-4">
                  <Link
                    href={`/destinations/${favorite.id}`}
                    className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    View Experience
                  </Link>
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
  );
}
