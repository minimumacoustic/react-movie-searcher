import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SearchForm } from "./components/SearchForm/";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { MoviesPage } from "./components/MoviePage";
import { Routes, Route, } from "react-router";


function App() {
  return (
    <>
      <Header />
      <ThemeSwitcher />
      <Routes>
        <Route
          path="/"
          Component={SearchForm}
        />
        <Route path="/movies/:id" Component={MoviesPage} />
      </Routes>
     
      <Footer />
    </>
  );
}

export default App;
