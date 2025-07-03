import { useContext, useState } from "react";
import "../styles/SelectCategories.css";
import { useCategories } from "../hooks/useFilters.js";
import { ProductContext } from "../contexts/productContext.jsx";

export const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [maxPrice, setMaxPrice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useCategories();
  const { setFilters } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ category: selectedCategory, maxPrice });
  };

  const handleChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSelect = (value) => {
    setSelectedCategory(value);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="filters-container">
        {categories.length > 0 && (
          <div className="select-categories">
            <span className="span-select" onClick={handleClick}>
              {selectedCategory}
            </span>
            <div>
              {isOpen && (
                <div className="options-select-container">
                  <div
                    className={`option-category ${
                      selectedCategory === "All Categories" ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("All Categories")}
                  >
                    All Categories
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className={`option-category ${
                        selectedCategory === category.name ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(category.name)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="filter-input-container">
          <input
            onChange={handleChange}
            id="maxPrice"
            placeholder="Max price"
            type="number"
          />
        </div>
      </div>
      <button className="filter-button-submit" type="submit">
        Filter
      </button>
    </form>
  );
};
