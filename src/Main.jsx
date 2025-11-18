import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

//// THIS WAS THE DELETE FUNCTION
/**
      <section>
        {ingredients.length > 0 ? <h2>Ingredients on hand:</h2> : null}
        <div className="ingredient-list-container">
          <ul className="ingredient-list">
            {ingredients.map((item) => (
              <li onClick={erase} key={ingredients.indexOf(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>*/

export default function Main() {
  const [ingredients, setIngredient] = React.useState([
    "chicken",
    "oregano",
    "tomatoes",
    "spices",
    "salt",
  ]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  //part of the old way of using an event listener for the form, need to have onSubmit={handleSubmit} in form
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

  /**
   * Uses action property in form  to prevent default behavior, reset form, and pass FormData without having to be explicit
   * @param {*} formData is passed in from the from using formData type and the name of the input
   */
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (!ingredients.includes(newIngredient) && !newIngredient == "") {
      //adds ingredients to the state ingredients
      setIngredient((prevItems) => [...prevItems, newIngredient]);
    }
  }

  function erase(key) {
    //filters by text inside the clicked list item, removes it from the state ingredients list and force render
    setResponse("");
    const newList = ingredients.filter((x) => x !== ingredients[key]);
    setIngredient(newList);
  }

  //generate the ready for recipe section with the button
  function generateRecipe() {
    return (
      <section className="generateButton">
        <div>
          <h3>Ready for recipe</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button disabled={isLoading} id="recipeButton" onClick={submitRecipe}>
          {isLoading ? "Loading" : "Get a Recipe"}
        </button>
      </section>
    );
  }

  //API CALL for recipe information
  async function submitRecipe() {
    console.log("pressed");
    const listedIngredients = ingredients.join(",");
    setIsLoading((prev) => !prev);

    await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3",
        prompt:
          " I have a list of ingredients, please give me a recipe. Here is the list: " +
          listedIngredients,
        stream: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(data.response);
        setIsLoading((prev) => !prev);
        console.log("before " + recipeShown);
        setRecipeShown((prev) => !prev);
        console.log("after " + recipeShown);
      })
      .catch((err) => {
        console.log("Error:", err);
        setIsLoading((prev) => !prev);
        setResponse("Error found, something happened you suck");
        setRecipeShown((prev) => !prev);
      });
  }

  //MAIN PAGE HERE
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

      <IngredientsList erase={erase} ingredients={ingredients} />

      {ingredients.length > 4 ? generateRecipe() : null}

      {recipeShown && ingredients.length > 4 && (
        <ClaudeRecipe response={response} />
      )}
    </main>
  );
}
