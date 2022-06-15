import React from "react";
import { useSelector } from "react-redux";

const Carousel = ({ images, id }) => {
  const { theme } = useSelector((state) => state);

  const isActive = (index) => {
    if (index === 0) return "active";
  };

  return (
    <div id={`images${id}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators" style={{ zIndex: 1 }}>
        {images.map((img, index) => (
          <button
            type="button"
            key={index}
            data-bs-target={`#image${id}`}
            data-bs-slide-to={index}
            className={isActive(index)}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            {img.url.match(/video/i) ? (
              <video
                controls
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                className="d-block w-100"
                src={img.url}
                alt={img.url}
              />
            ) : (
              <img
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  background: "lightgray",
                }}
                className="d-block w-100"
                src={img.url}
                alt={img.url}
              />
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <a
            className="carousel-control-prev"
            href={`#image${id}`}
            role="button"
            data-bs-target={`#images${id}`}
            data-bs-slide="prev"
            style={{ width: "5%" }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>

          <a
            className="carousel-control-next"
            href={`#image${id}`}
            role="button"
            data-bs-target={`#images${id}`}
            data-bs-slide="next"
            style={{ width: "5%" }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </>
      )}
    </div>
  );
};

export default Carousel;
