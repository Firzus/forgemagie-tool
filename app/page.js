"use client";

import React, { useState, useEffect } from "react";
import { searchItem } from "../utils/searchItem";
import runes from "../data/runes.json";

const calculateStats = (item) => {
  let totalWeight = 0;
  const stats = item.effects.reduce((acc, effect) => {
    const rune = runes.find((rune) => rune.id === effect.characteristic);
    if (rune) {
      const density = rune.price.talKasha / rune.weight;
      const quantity = (effect.from + effect.to) / 2;
      const blend = density * quantity;
      totalWeight += blend;
    }
    acc[effect.characteristic] = (effect.from + effect.to) / 2;
    return acc;
  }, {});
  return { stats, totalWeight };
};

const Home = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemStats, setItemStats] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    if (selectedItem) {
      const { stats, totalWeight } = calculateStats(selectedItem);
      setItemStats(stats);
      setTotalWeight(totalWeight);
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchItem(name)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'appel de la fonction:", error);
      });
  };

  return (
    <main>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom de l'item:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Rechercher</button>
      </form>

      {/* Results */}
      <section>
        {result.map((item, index) => (
          <div key={index} onClick={() => setSelectedItem(item)}>
            <p>{item.name.fr}</p>
            <img src={item.img} />
          </div>
        ))}
      </section>

      <p>~~~~~~~~~~~~~~~~~~~~~~</p>

      {/* Item Stats */}
      <section>
        {selectedItem && (
          <div>
            <h2>Détails pour {selectedItem.name.fr}</h2>
            <img src={selectedItem.img} />
            <p>totalWeight: {totalWeight}</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
