import React, { useEffect, useState } from "react";
import './MealsStyle.scss'

function HomePage() {
  const [meals, setMeals] = useState([]);

  const mealsApiUrl = "http://localhost:8080/api/allMeals";

  function hasTokenInLocalStorage(props) {
    return localStorage.getItem("tokens") !== null;
  }

  let jwtToken = "";

  if (hasTokenInLocalStorage()) {
    const localStorageObj = JSON.parse(localStorage.getItem("tokens"));
    jwtToken = localStorageObj.jwt;
  }

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch(mealsApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMeals(data);
        } else {
          throw new Error("Error: " + response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchMeals();
  }, []);

  console.log(meals);

  return (
    <div>
      {meals.length === 0 && (
        <div>
          <h2>NO MEALS AVAILABLE</h2>
          <p>
            <i>Please <a href="/login">log in</a> to see meals</i>
          </p>
        </div>
      )}
      {meals.length !== 0 && (
        <div className="meals-container">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <h3>Title: {meal.title}</h3>
              <h5>Quantity: {meal.quantity}</h5>
              <p>Description: {meal.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
