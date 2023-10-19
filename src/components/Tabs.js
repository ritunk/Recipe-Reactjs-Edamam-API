import React, { useState, useEffect } from "react";
import { CiPizza } from "react-icons/ci";
import { GiNoodles, GiFruitBowl, GiCheckMark } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { fetchTabData } from "../service";

const Tabs = () => {
  const [active, setActive] = useState("Pizza");
  const [tabData, setTabData] = useState("");

  const [tabLable, setTabLabel] = useState([
    {
      name: "Pizza",
      icons: <CiPizza />,
      id: "0209cb28fc05320434e2916988f47b71",
    },
    {
      name: "noodles",
      icons: <GiNoodles />,
      id: "e0f06a8d4769e6a9344ff766d04a206f",
    },
    {
      name: "Desert",
      icons: <GiFruitBowl />,
      id: "bc865476ffe2b8a03fbe9aee2f739740",
    },

    {
      name: "Ice cream",
      icons: <MdOutlineIcecream />,
      id: "7c5a5ced83523b4dc49adbc78471cc38",
    },
  ]);

  const handleClick = (name, id) => {
    setActive(name);

    fetchTabData(id).then((response) => {
      setTabData(response);
    });
  };

  useEffect(() => {
    fetchTabData(tabLable[0].id).then((response) => {
      // console.log(response)
      setTabData(response);
    });
  }, []);
  return (
    <div className="container">
      <h1 className="recipeHeading">What would you like to have!</h1>
      <div className="tabs">
        {tabLable.map((item, index) => (
          <div
            onClick={() => handleClick(item.name, item.id)}
            key={index}
            className={`tablist ${active === item.name ? "active" : ""}`}
          >
            {item.icons}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="recipe_banner">
        {tabData !== "" && (
          <>
            <div className="left-col">
              <span className="badge">{tabData.recipe.cuisineType[0]}</span>
              <h1>{tabData.recipe.label}</h1>
              <p>
                <strong>Recipe by:</strong>
                <small>{tabData.recipe.source}</small>
              </p>
              <h3>Ingredients</h3>
              <div className="ingredients">
                <ul>
                  <li>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{tabData.recipe.ingredientLines[0]}</span>
                  </li>
                  <li>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{tabData.recipe.ingredientLines[1]}</span>
                  </li>
                  <li>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{tabData.recipe.ingredientLines[2]}</span>
                  </li>
                  <li>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{tabData.recipe.ingredientLines[3]}</span>
                  </li>
                  <li>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{tabData.recipe.ingredientLines[4]}</span>
                  </li>
                  <li>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{tabData.recipe.ingredientLines[5]}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right-col">
              <div className="image-wrapper">
                <img src={tabData.recipe.image} alt={tabData.recipe.label} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;
