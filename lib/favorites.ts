// This is a simple client-side favorites system using localStorage
// In a real app, this would be connected to a database

export interface Favorite {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  addedAt: string;
}

// Get all favorites from localStorage
export const getFavorites = (): Favorite[] => {
  if (typeof window === "undefined") return [];
  
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

// Add a destination to favorites
export const addToFavorites = (destination: Omit<Favorite, "addedAt">): void => {
  if (typeof window === "undefined") return;
  
  const favorites = getFavorites();
  
  // Check if already in favorites
  const existingIndex = favorites.findIndex((fav) => fav.id === destination.id);
  
  if (existingIndex === -1) {
    // Add new favorite with timestamp
    const newFavorite: Favorite = {
      ...destination,
      addedAt: new Date().toISOString(),
    };
    
    favorites.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Remove a destination from favorites
export const removeFromFavorites = (id: string): void => {
  if (typeof window === "undefined") return;
  
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.id !== id);
  
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Check if a destination is in favorites
export const isInFavorites = (id: string): boolean => {
  if (typeof window === "undefined") return false;
  
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === id);
};
