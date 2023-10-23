import Navbar from "./components/navbar";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div> */}
      <Home />
    </div>
  );
}

export default App;
