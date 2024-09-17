import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [dataChanged, setDataChanged] = useState(false);

    return (
        <DataContext.Provider value={{ dataChanged, setDataChanged }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
