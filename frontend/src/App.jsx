import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar/NavBar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer.jsx";
import OrderPage from "./components/orders/Orders.jsx";
import { supabase } from "./supabaseClient";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <div className="mx-20 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/orders" element={<OrderPage user={user} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
