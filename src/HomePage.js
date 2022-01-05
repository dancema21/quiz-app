import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(9);
  let navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch(`https://opentdb.com/api_category.php`);
    const data = await res.json();
    setCategories(data.trivia_categories);
  }

  return (
    <main>
      <h1>Quiz App</h1>

      <p>Select a category</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/category/${selectedCategoryID}`);
        }}
      >
        <select
          value={selectedCategoryID}
          onChange={(e) => setSelectedCategoryID(e.target.value)}
        >
          {categories.map((categorie) => (
            <option value={`${categorie.id}`} key={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
        <button type="submit">Let&apos;s Play</button>
      </form>
    </main>
  );
};

export default HomePage;
