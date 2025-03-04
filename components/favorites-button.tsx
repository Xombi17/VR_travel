"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToFavorites, removeFromFavorites, isInFavorites } from "@/lib/favorites";
import { toast } from "sonner";

interface FavoritesButtonProps {
  destinationId: string;
  destinationName: string;
  destinationLocation: string;
  destinationImage: string;
  destinationRating: number;
  className?: string;
}

export default function FavoritesButton({
  destinationId,
  destinationName,
  destinationLocation,
  destinationImage,
  destinationRating,
  className = "",
}: FavoritesButtonProps) {
  const { status } = useSession();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the destination is in favorites when the component mounts
    setIsFavorite(isInFavorites(destinationId));
    setIsLoading(false);
  }, [destinationId]);

  const handleToggleFavorite = () => {
    if (status !== "authenticated") {
      // Redirect to sign in if not authenticated
      toast.error("Please sign in to save favorites", {
        description: "Create an account or sign in to save this destination",
        action: {
          label: "Sign In",
          onClick: () => router.push("/auth/signin"),
        },
      });
      return;
    }

    if (isFavorite) {
      removeFromFavorites(destinationId);
      setIsFavorite(false);
      toast.success("Removed from favorites", {
        description: `${destinationName} has been removed from your favorites`,
      });
    } else {
      addToFavorites({
        id: destinationId,
        name: destinationName,
        location: destinationLocation,
        image: destinationImage,
        rating: destinationRating,
      });
      setIsFavorite(true);
      toast.success("Added to favorites", {
        description: `${destinationName} has been added to your favorites`,
      });
    }
  };

  if (isLoading) {
    return (
      <button
        className={`rounded-full bg-gray-900/60 p-2 backdrop-blur-sm ${className}`}
        disabled
      >
        <Heart className="h-5 w-5 text-gray-400" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`rounded-full bg-gray-900/60 p-2 backdrop-blur-sm transition-all hover:scale-110 ${className}`}
    >
      <Heart
        className={`h-5 w-5 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-white"
        }`}
      />
    </button>
  );
}
