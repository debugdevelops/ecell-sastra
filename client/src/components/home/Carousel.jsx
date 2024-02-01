import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import elakiya from "../../assets/images/elakiya.jpg";
import akash from "../../assets/images/akash.jpeg";
import khader from "../../assets/images/khader.jpg";
import keerthanashree from "../../assets/images/keerthanashree.jpeg";
import styles from "./Carousel.module.css";
import next from "../../assets/icons/front.svg";

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        image: elakiya,
        heading: "Elakiya S",
        description:
          "Right from the day I joined, E-Cell remained unique in its own way in all aspects. The interaction with entire team and the bonding I had, made me to feel it neverthless than my home!",
      },
      {
        image: khader,
        heading: "Khader A Shabu",
        description:
          "I am extremely happy to be part of E-Cell during its growth phase and awestruck on seeing the way E-Cell grows even now! Thank you E-Cell for helping me to have a overall stupendous growth.",
      },
      {
        image: keerthanashree,
        heading: "Keerthanashree A",
        description:
          "ECell Sastra has been a significant part of my college life and helped me mold into a better person. It's not just a team but a community which finds the right talents and help build it.",
      },
      {
        image: akash,
        heading: "Akash Krishna",
        description:
          "Doing what you love is not always loving what you do. Little things like a hobby  a side job or some role that spreads happiness in ones life, help us to feel lively and adds extra meaning to the life in terms of happiness.  So, believe in your passion and it can serve your purpose!",
      },
    ]);
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return items.length === 0 ? (
    "Loading"
  ) : (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      nextIcon={<img src={next} className={styles.next} alt="next" />}
      prevIcon={<img src={next} className={styles.prev} alt="previous" />}
    >
      {items.map((item) => {
        return (
          <Carousel.Item key={item.heading}>
            <div className={styles.item}>
              <img src={item.image} alt={item.heading} />
              <h2>{item.heading}</h2>
              <p>{item.description}</p>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
