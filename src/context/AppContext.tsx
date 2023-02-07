import { destroyCookie, parseCookies } from "nookies";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { decodeJWTPayload, isTokenExpired } from "../config/token";
import { ILoggedUser } from "../interfaces/User";

type AppContextValue = {
  isLogged: boolean;
  user: ILoggedUser | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  checkUser: () => boolean;
  signOut: () => void;
};

export const AppContext = createContext<AppContextValue | null>({
  isLogged: false,
  user: {} as ILoggedUser,
  setToken: () => {},
  checkUser: () => false,
  signOut: () => {},
});

type AppProviderProps = {
  children: React.ReactElement;
};

export const useApp = () => useContext(AppContext) as AppContextValue;
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<ILoggedUser | null>(
    {} as ILoggedUser
  );

  const checkUser = useCallback(() => {
    if (token) {
      const decodedToken = decodeJWTPayload(token);
      const user = {
        name: decodedToken.name,
        email: decodedToken.email,
        expires: decodedToken.exp,
      };

      if (isTokenExpired(token)) {
        setLoggedUser(null);
        setToken(null);

        return false;
      }

      setLoggedUser(user);
      return true;
    }

    setLoggedUser(null);
    return false;
  }, [token]);

  const signOut = useCallback(() => {
    if (token) {
      setLoggedUser(null);
      setToken(null);

      destroyCookie(null, "@eventful:access_token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (window !== undefined) {
      const { "@eventful:access_token": acessToken } = parseCookies();
      setToken(acessToken ?? null);
    }
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      if (token && isTokenExpired(token)) {
        setLoggedUser(null);
        setToken(null);
        destroyCookie(null, "@eventful:access_token");
      }
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        isLogged: token ? true : false,
        user: loggedUser,
        setToken,
        checkUser,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
