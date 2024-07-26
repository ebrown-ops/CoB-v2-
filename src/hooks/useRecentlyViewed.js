import { useState, useEffect } from 'react';

export function useRecentlyViewed(key, maxItems = 5) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem(key);
    if (storedItems) {
      setRecentlyViewed(JSON.parse(storedItems));
    }
  }, [key]);

  const addItem = (item) => {
    setRecentlyViewed((prevItems) => {
      const newItems = [item, ...prevItems.filter((i) => i.id !== item.id)].slice(0, maxItems);
      localStorage.setItem(key, JSON.stringify(newItems));
      return newItems;
    });
  };

  return [recentlyViewed, addItem];
}