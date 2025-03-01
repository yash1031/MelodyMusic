import React, { useState, useRef, useEffect } from "react";
import "./AllContent.css";

const AllContent = () => {
  const [arr, setArr] = useState([
    "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh",
    "ii", "jj", "kk", "ll", "mm", "nn", "oo"
  ]);

  const sections = [
    "Recently Played",
    "Made For YASH GOYAL",
    "Best Of Artists",
    "Trending Music",
    "Old Melodies",
    "Best Of Albums",
  ];

  const scrollRefs = useRef({}); // Store refs dynamically for each section
  const [scrollState, setScrollState] = useState({});

  // Function to track scroll position for each section
  const checkScrollPosition = (id) => {
    if (!scrollRefs.current[id]) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRefs.current[id];

    setScrollState((prev) => ({
      ...prev,
      [id]: {
        canScrollLeft: scrollLeft > 0,
        canScrollRight: scrollLeft < scrollWidth - clientWidth,
      },
    }));
  };

  // Function to scroll left/right
  const scroll = (id, direction) => {
    if (!scrollRefs.current[id]) return;
    
    const scrollAmount = 300; // Adjust scroll amount as needed
    scrollRefs.current[id].scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => checkScrollPosition(id), 100); // Delay to update state
  };

  return (
    <div id="all-content">
      {sections.map((section, idx) => {
        const id = `section-${idx}`;

        return (
          <div key={id}>
            <h1>{section}</h1>
            <div className="section">
              {/* Left Scroll Button */}
              {scrollState[id]?.canScrollLeft && (
                <button className="scroll-btn left" onClick={() => scroll(id, "left")}>
                  &lt;
                </button>
              )}

              {/* Scrollable Container */}
              <div
                className="scroll-container"
                ref={(el) => (scrollRefs.current[id] = el)}
                onScroll={() => checkScrollPosition(id)}
              >
                {arr.map((item, index) => (
                  <div key={index} className="card">
                    <div className="card-body">
                      <h5 className="card-title">Card title is {item}</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Scroll Button */}
              {scrollState[id]?.canScrollRight && (
                <button className="scroll-btn right" onClick={() => scroll(id, "right")}>
                  &gt;
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllContent;
