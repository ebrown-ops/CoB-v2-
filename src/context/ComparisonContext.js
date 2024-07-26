import React, { createContext, useState, useContext, useEffect } from 'react';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('selectedComparisonItems');
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedComparisonItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const addItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const removeItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearItems = () => {
    setSelectedItems([]);
  };

  return (
    <ComparisonContext.Provider value={{ selectedItems, addItem, removeItem, clearItems }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  return useContext(ComparisonContext);
}