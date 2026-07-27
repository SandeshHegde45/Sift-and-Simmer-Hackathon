import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import CategoriesIndex from "./pages/CategoriesIndex";
import CategoryDetail from "./pages/CategoryDetail";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useAuthListener } from "./utils/useAuthListener";

function App() {
  useAuthListener();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesIndex />} />
          <Route path="/categories/:category" element={<CategoryDetail />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;