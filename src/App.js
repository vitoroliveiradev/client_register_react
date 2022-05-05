import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';

const App = () => {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/clients/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
