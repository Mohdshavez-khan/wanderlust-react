
import { useState } from "react";
import "./Filters.css";

function Filters({selectedFilter, setSelectedFilter}) {
  

  const filters = [
    { label: "All", value: "all", icon: "fa-solid fa-earth-americas" },
    { label: "Beach", value: "beach", icon: "fa-solid fa-umbrella-beach" },
    { label: "Mountain", value: "mountain", icon: "fa-solid fa-mountain" },
    { label: "Farm", value: "farm", icon: "fa-solid fa-tractor" },
    { label: "Pool", value: "pool", icon: "fa-solid fa-person-swimming" },
    { label: "Rooms", value: "room", icon: "fa-solid fa-house-chimney" },
    { label: "Camping", value: "camping", icon: "fa-solid fa-campground" },
    { label: "Arctic", value: "arctic", icon: "fa-solid fa-snowman" },
    { label: "Island", value: "island", icon: "fa-solid fa-earth-oceania" },
    { label: "Villas", value: "villas", icon: "fa-solid fa-building-columns" },
    { label: "Forest", value: "forest", icon: "fa-solid fa-tree" },
    
  ];

  return (
    <div className="container-fluid">
      <div className="container-fluid py-2 py-md-2 px-2">
        <div className="filters-scroll d-flex flex-nowrap align-items-stretch gap-2 px-1 px-md-2">
          {filters.map((filter) => {
            const isActive = selectedFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                className={`filter-pill d-flex flex-column align-items-center justify-content-center text-center rounded-3 border-0 bg-transparent ${isActive ? "active" : ""}`}
                onClick={() => setSelectedFilter(filter.value)}
              >
                <i className={`filter-icon ${filter.icon}`}></i>
                <span className="filter-label mt-2">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;