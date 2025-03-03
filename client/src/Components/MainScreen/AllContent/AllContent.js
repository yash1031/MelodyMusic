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

  const scrollRefs = useRef(new Array(sections.length).fill(null)); // Store refs dynamically for each section
  const [scrollState, setScrollState] = useState(new Array(sections.length).fill({canScrollLeft: false, canScrollRight: true}));

  const checkScrollPosition = (idx) => {
    if (!scrollRefs.current[idx]) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRefs.current[idx];

    setScrollState((prev) => ([
      ...prev.slice(0,idx),
      {
        canScrollLeft: scrollLeft > 0,
        canScrollRight: scrollLeft < scrollWidth - clientWidth,
      },
      ...prev.slice(idx+1)
    ]));
  };

  // Function to scroll left/right
  const scroll = (idx, direction) => {
    if (!scrollRefs.current[idx]) return;
    
    const scrollAmount = 300; // Adjust scroll amount as needed
    scrollRefs.current[idx].scrollLeft += direction === "left" ? -scrollAmount : scrollAmount; // On scrolling right, scrollLeft amount will increase and it will decrease on scrolling left

    setTimeout(() => checkScrollPosition(idx), 100); // Delay to update state
  };

  return (
    <div id="all-content">
      {sections.map((section, idx) => {
        const id = `section-${idx}`;

        return (
          <div key={idx}>
            <h1>{section}</h1>
            <div className="section">
              {/* Left Scroll Button */}
              {scrollState[idx]?.canScrollLeft && (
                <button className="scroll-btn left" onClick={() => scroll(idx, "left")}>
                  &lt;
                </button>
              )}

              {/* Scrollable Container */}
              <div
                className="scroll-container"
                ref={(el) => (scrollRefs.current[idx] = el)}
                onScroll={() => checkScrollPosition(idx)}
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
              {scrollState[idx]?.canScrollRight && (
                <button className="scroll-btn right" onClick={() => scroll(idx, "right")}>
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
