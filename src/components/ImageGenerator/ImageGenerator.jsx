import React, { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.svg";

const ImageGenerator = () => {
  // create state in function component
  const [image_url, setImage_url] = useState("/");
  //   prevent unneccessary re-renders of components
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
          "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();
    console.log(data);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>

      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} />
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to See"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
