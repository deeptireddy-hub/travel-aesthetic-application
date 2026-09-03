import { useState, useMemo } from 'react';
import { DESTINATIONS } from '../data/destinations';

export function useDestinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || dest.category.includes(selectedCategory);

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return {
    destinations: filteredDestinations,
    allDestinations: DESTINATIONS,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  };
}
