import React from "react";

export default function Main() {
  const [ingredients, setIngredient] = React.useState([
    "chicken",
    "oregano",
    "tomatoes",
  ]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");

    if (!ingredients.includes(newIngredient) && !newIngredient == "") {
      //adds ingredients to the state ingredients
      setIngredient((prevItems) => [...prevItems, newIngredient]);
      event.target.reset();
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (!ingredients.includes(newIngredient) && !newIngredient == "") {
      //adds ingredients to the state ingredients
      setIngredient((prevItems) => [...prevItems, newIngredient]);
    }
  }

  function erase(key) {
    //filters by text inside the clicked list item, removes it from the state ingredients list and force render
    console.log(key.target.innerHTML);
    const newList = ingredients.filter((x) => x !== key.target.innerHTML);
    setIngredient(newList);
  }

  return (
    <main>
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          name="ingredient"
          type="text"
          placeholder="e.g oregano"
          aria-label="Add ingredient"
        />

        <button>Add ingredient</button>
      </form>

      <div className="ingredient-list-container">
        <ul className="ingredient-list">
          {ingredients.map((item) => (
            <li onClick={erase} key={ingredients.indexOf(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
