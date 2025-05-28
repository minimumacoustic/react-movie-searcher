import { Header } from './components/header'
import { Footer } from './components/footer'
import { SearchForm } from './components/SearchForm/'
import {ThemeSwitcher} from './components/ThemeSwitcher'
import { ScrollToTopButton } from './components/UpButton'
function App() {
 

  return (
    <>
      <Header/>
      <ThemeSwitcher/>
      <SearchForm/>
      <ScrollToTopButton/>
      <Footer/>
    </>
  )
}

export default App
