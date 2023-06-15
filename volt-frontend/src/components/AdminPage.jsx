import React, { useState } from "react";

function AdminPage() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");

  const localStorageObj = JSON.parse(localStorage.getItem("tokens"));
  const jwtToken = localStorageObj.jwt;

  const addMeal = (e) => {

    e.preventDefault();

    const mealInput = { title, description, quantity };

    fetch('http://localhost:8080/api/addMeal', {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${jwtToken}`
        },
      body: JSON.stringify(mealInput),
    })
      .then((res) => res.json())
      .then((data) => {

      });

    setTitle("")
    setQuantity(0)
    setDescription("")
  };

  return (
    <div>
      <form className="register-form" onSubmit={addMeal}>
        <h1>Add a Meal 🍔</h1>
        <br />
        <div className="register-input">
          <label htmlFor="title">Meal Title</label>
          <input
            type="text"
            id="title"
            value={title}
            required
            placeholder="For Example: Burger"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="register-input">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            min="0"
            value={quantity}
            required
            placeholder="For Example: 1"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="register-input">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add a Meal</button>
      </form>
    </div>
  );
}

export default AdminPage;
