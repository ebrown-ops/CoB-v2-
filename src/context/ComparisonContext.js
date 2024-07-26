import React, { createContext, useState, useContext } from 'react';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

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