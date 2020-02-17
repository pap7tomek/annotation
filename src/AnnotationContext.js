import React from 'react';
export const AnnotationContext = React.createContext({
    loaded: false,    
    isOpen: 0,
    data: [],
    openPopup: () => {},
    closePopup: () => {},
    updateData: () => {},
  });