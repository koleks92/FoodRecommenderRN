import React from 'react';

const RecommendationContext = React.createContext();

export const useRecommendation = () => {
  return React.useContext(RecommendationContext);
};

export const RecommendationProvider = ({ children }) => {
  const recommendAnotherHandler = () => {
    console.log("Reeeeee")
  };

  return (
    <RecommendationContext.Provider value={recommendAnotherHandler}>
      {children}
    </RecommendationContext.Provider>
  );
};