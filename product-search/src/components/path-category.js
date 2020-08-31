import React from "react";
import "../sass/path-category.scss";

export default function PathCategory(pathCategory) {
  const path = pathCategory.path;
  if (!path) {
    return null;
  } else {
    return (
      <div className="container-path">
        <ul className="container-path__path-list">
          {path.map((category, index) => {
            return (
              <li className="container-path__path-item" key={index}>
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
