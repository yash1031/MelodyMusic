import React, {useState, useRef} from 'react'
import './AllContent.css'

const AllContent = () => {

  const [arr, setArr]= useState(['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo']);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [sections, setSections]= useState(['Recently Played', 'Made For YASH GOYAL', 'Best Of Artists', 'Trending Music', 'Old Melodies', 'Best Of Albums']);

  const checkScrollPosition = () => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      console.log("scrollContainerRef.current ", scrollContainerRef.current);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  const scroll = (direction) => {
      if (!scrollContainerRef.current) return;
      const scrollAmount = 300;
      scrollContainerRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
      setTimeout(checkScrollPosition, 300);
  };

  return (
    <div id="all-content">
      {sections.map((item, idx)=>{
        return (
          <>
              <div><h1>{item}</h1></div>
              <div className="section">
              {canScrollLeft && <button className="scroll-btn left" onClick={() => scroll("left")}><i className="fa-solid fa-less-than"/></button>}
                  <div className="scroll-container" ref={scrollContainerRef} onScroll={checkScrollPosition}>
                      {arr.map((item, idx)=>{
                        return  ( 
                                  <div key={idx} className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">Card title. How is it?</h5>
                                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                  </div>
                                )
                        })} 
                    </div>
              {canScrollRight && <button className="scroll-btn right" onClick={() => scroll("right")}><i className="fa-solid fa-greater-than"/></button>}
              </div>
          </>
        )
      }) }
      
    </div>
  )
}

export default AllContent
