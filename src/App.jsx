import { useState } from "react";
import "./App.css";

function App() {
  // states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  // getGender and error handling
  const getGender = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.genderize.io?name=${query}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setIsLoading(false);
      console.log("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <main className="h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg w-1/2 shadow-lg flex flex-col">
          <label htmlFor="name" className=" text-xl font-mono p-2 text-center">
            Enter name of person here.
          </label>
          <input
            className="border-2 border-gray-500 p-2 m-3 rounded-md focus:border-teal-500 focus:ring-teal-500"
            type="input"
            placeholder="Enter any name here"
            name="name"
            id="name"
            autoComplete="off"
            required
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={getGender}
            className="border border-blue-600 p-2 m-3 hover:border-blue-900 rounded-md bg-blue-600 hover:bg-blue-900 text-white"
          >
            Genderize
          </button>
          <div>
            {isLoading ? (
              <div className=" text-sm font-mono m-3">Loading...</div>
            ) : (
              <div>
                <h4 className=" text-lg text-center font-mono m-3">
                  {data.gender}
                </h4>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
