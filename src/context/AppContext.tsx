import axios from "axios";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/User";

type AppContextValue = {
  isLogged: boolean;
  user: IUser | undefined;
};

export const AppContext = createContext<AppContextValue | null>({
  isLogged: false,
  user: {} as IUser,
});

type AppProviderProps = {
  children: React.ReactElement;
};

export const useApp = () => useContext(AppContext) as AppContextValue;
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        isLogged: false,
        user: undefined,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
