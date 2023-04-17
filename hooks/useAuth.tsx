import { auth } from "@/firebase";
import { ICart } from "@/interface";
import { toastType } from "@/utils/toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;

  setUser: Dispatch<SetStateAction<User | null>>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  setError: Dispatch<SetStateAction<null | string>>;

  // Cart
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: ICart[] | [];
  setCartItems: Dispatch<SetStateAction<ICart[] | []>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  totalQuantities: number;
  setTotalQuantities: Dispatch<SetStateAction<number>>;
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  onAdd: (product: ICart, quantity: number) => void;
  toggleCartItemQuantity: (id: number, direction: string) => void;
  onRemove: (item: any) => void;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
  setUser: async () => {},
  signInWithGoogle: async () => {},
  error: null,
  loading: false,
  setError: () => {},

  // Cart
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  totalQuantities: 0,
  setTotalQuantities: () => {},
  qty: 1,
  setQty: () => {},
  onAdd: () => {},
  toggleCartItemQuantity: () => {},
  onRemove: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const router = useRouter();

  // persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // logged in
          setUser(user);
          setLoading(false);
        } else {
          // not logged in
          setUser(null);
          setLoading(true);
          // router.push("/login");
        }
        setInitialLoading(false);
      }),
    [auth]
  );
  const signInWithGoogle = async () => {
    if (!user) {
      await signInWithPopup(auth, provider)
        .then((userCredential) => {
          setUser(userCredential.user);
          router.push("/");
          setLoading(false);
        })
        .catch((error) => {
          toastType.error(error);
        })
        .finally(() => setLoading(false));
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        if (error.message.includes("in-use")) {
          toastType.error("Email is already in use");
        } else if (error.message.includes("weak-password")) {
          toastType.error("Password should be at least 6 characters");
        }
      })
      .finally(() => setLoading(false));
  };
  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        if (error.message.includes("password")) {
          toastType.error("Wrong password");
        } else if (error.message.includes("user-not-found")) {
          toastType.error("User not found");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let foundProduct: any;
  let index;
  const onAdd = (product: ICart, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item: ICart) => item?.id === product?.id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems =
        cartItems &&
        cartItems?.map((cartProduct: ICart) => {
          if (cartProduct?.id === product?.id)
            return {
              ...cartProduct,
              quantity: cartProduct?.quantity + quantity,
            };
        });
      const validCartItems = updatedCartItems.filter(
        (item) => item !== undefined
      ) as ICart[];

      setCartItems(validCartItems);

      // const updatedCartItems = cartItems.filter(
      //   (item) => item !== undefined
      // ) as ICart[];
      // setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toastType.default(`${qty} ${product.title} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: number, direction: any) => {
    foundProduct = cartItems.find((item: any) => item.id === id);
    index = cartItems.findIndex((product: any) => product.id === id);
    const newCartItems: any = cartItems.filter((item: any) => item.id !== id);

    if (direction === "inc") {
      setCartItems([
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems,
      ]);
      setTotalPrice((prevTotalPrice) =>
        parseFloat((prevTotalPrice + foundProduct.price).toFixed(2))
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (direction === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...newCartItems,
        ]);
        setTotalPrice((prevTotalPrice) =>
          parseFloat((prevTotalPrice - foundProduct.price).toFixed(2))
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const onRemove = (product: any) => {
    foundProduct = cartItems.find((item: any) => item.id === product.id);
    const newCartItems = cartItems.filter(
      (item: any) => item.id !== product.id
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const memoValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logout,
      loading,
      error,
      setUser,
      setError,
      signInWithGoogle,
      showCart,
      setShowCart,
      cartItems,
      setCartItems,
      totalPrice,
      setTotalPrice,
      totalQuantities,
      setTotalQuantities,
      qty,
      setQty,
      onAdd,
      toggleCartItemQuantity,
      onRemove,
    }),
    [
      user,
      loading,
      error,
      setError,
      setShowCart,
      showCart,
      totalQuantities,
      totalPrice,
      qty,
      setQty,
    ]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoading && children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
