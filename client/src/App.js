import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Library from "./Components/Library/Library";
import AllContent from "./Components/AllContent/AllContent";

function App() {
  return (
    <div id="App">
      <div id="navBar">
        <Navbar></Navbar>
      </div>
      <div id="libraryAndContent">
        <div id="library">
          <Library></Library>
        </div>
        <div id="allContent">
          <AllContent></AllContent>
        </div>
      </div>
    </div>
  );
}

export default App;
