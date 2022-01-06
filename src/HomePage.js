import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./components/Spinner";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch(`https://opentdb.com/api_category.php`);
      if (res.status >= 400) throw new Error("Error with status " + res.status);
      const data = await res.json();
      setCategories(data.trivia_categories);
      setLoading(false);
    } catch (e) {
      console.error("error ", e);
      setLoading(false);
      setError(true);
    }
  }

  if (loading)
    return (
      <>
        <h1 className="text-center mb-2 text-lg font-bold">Quiz App</h1>
        <Spinner />
      </>
    );

  if (error)
    return (
      <>
        <h1 className="text-center mb-2 text-lg font-bold">Quiz App</h1>
        <div className="font-bold text-lg mt-15 text-rose-500 text-center">
          App is not available for now, try again later
        </div>
      </>
    );

  return (
    <>
      <h1 className="text-center mb-2 text-lg font-bold">Quiz App</h1>
      <p className="text-center">Select a category</p>
      <form
        className="flex basis-full items-center flex-col mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/category/${selectedCategoryID}`);
        }}
      >
        <select
          value={selectedCategoryID}
          onChange={(e) => setSelectedCategoryID(e.target.value)}
          className="w-full mt-3"
        >
          {categories.map((categorie) => (
            <option value={`${categorie.id}`} key={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-700 text-white py-2 px-4 rounded-full mt-10 lg:w-1/4 sm:1/2"
        >
          Let&apos;s Play
        </button>
      </form>
    </>
  );
};

export default HomePage;
