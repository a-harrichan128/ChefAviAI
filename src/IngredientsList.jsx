export default function IngredientsList(props) {
  const ingredientsList = props.ingredients;

  return (
    <div className="ingredient-list-container">
      <ul className="ingredient-list">
        {ingredientsList.map((item) => (
          <li
            onClick={() => props.erase(ingredientsList.indexOf(item))}
            key={ingredientsList.indexOf(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
