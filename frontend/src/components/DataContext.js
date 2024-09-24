import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

// index.js - This code sets up a context (DataContext) to manage and share a boolean state (dataChanged)
// and its updater function (setDataChanged) across React components on using the DataProvider and useData hook.
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
