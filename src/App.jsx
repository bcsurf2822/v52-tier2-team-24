import "./App.css";
import LandingForm from "./components/LandingForm";

function App() {
  return (
    <>
      <div className=" bg-blue-100 flex justify-center items-center grid md:grid-cols-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Hello from Solar App!
        </h1>

        <LandingForm />
      </div>
    </>
  );
}

export default App;
