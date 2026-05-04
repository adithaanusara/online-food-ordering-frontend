import { useEffect, useMemo, useRef, useState } from "react";

type FoodSlide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
};

const realSlides: FoodSlide[] = [
  {
    id: 1,
    title: "Chicken Popcorn",
    subtitle: "Crispy bite-sized chicken pieces",
    image: "/images/chicken-popcorn.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Fried Chicken",
    subtitle: "Golden crispy chicken with rich flavor",
    image: "/images/fried-chicken.jpg",
    badge: "Hot Deal",
  },
  {
    id: 3,
    title: "Chicken Burger",
    subtitle: "Juicy burger with fresh toppings",
    image: "/images/chicken-burger.jpg",
    badge: "Fresh",
  },
  {
    id: 4,
    title: "Chicken Nuggets",
    subtitle: "Crunchy nuggets for quick cravings",
    image: "/images/chicken-nuggets.jpg",
    badge: "Combo Pick",
  },
  {
    id: 5,
    title: "Chicken Strips",
    subtitle: "Tender strips with bold taste",
    image: "/images/chicken-strips.jpg",
    badge: "Premium",
  },
];

export default function FoodLoopCarousel() {
  const clonedSlides = useMemo(
    () => [
      realSlides[realSlides.length - 1],
      ...realSlides,
      realSlides[0],
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const autoSlideRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const mouseDownRef = useRef(false);

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      window.clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideRef.current = window.setInterval(() => {
      goNext();
    }, 2600);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const goNext = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === clonedSlides.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(realSlides.length);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });

      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const activeDot =
    currentIndex === 0
      ? realSlides.length - 1
      : currentIndex === clonedSlides.length - 1
      ? 0
      : currentIndex - 1;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    stopAutoSlide();
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startXRef.current === null) {
      startAutoSlide();
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startXRef.current;

    if (diff > 50) {
      goPrev();
    } else if (diff < -50) {
      goNext();
    }

    startXRef.current = null;
    startAutoSlide();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    stopAutoSlide();
    mouseDownRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDownRef.current || startXRef.current === null) {
      startAutoSlide();
      return;
    }

    const diff = e.clientX - startXRef.current;

    if (diff > 50) {
      goPrev();
    } else if (diff < -50) {
      goNext();
    }

    mouseDownRef.current = false;
    startXRef.current = null;
    startAutoSlide();
  };

  const handleMouseLeave = () => {
    mouseDownRef.current = false;
    startXRef.current = null;
    startAutoSlide();
  };

  return (
    <section className="fx-loop-showcase">
      <div className="fx-loop-showcase__pattern"></div>

      {/* <div className="fx-loop-showcase__brand">
        <span className="fx-loop-showcase__mini">FoodExpress</span>
        <h2>Popular Foods</h2>
        <p>Swipe through our top picks and discover your next favorite meal.</p>
      </div> */}

      <div
        className="fx-slider-window"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`fx-slider-track ${
            transitionEnabled ? "fx-slider-track--animated" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedSlides.map((slide, index) => (
            <div className="fx-slide" key={`${slide.id}-${index}`}>
              <article className="fx-food-card">
                <div className="fx-food-card__badge">{slide.badge}</div>

                <div className="fx-food-card__image-wrap">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="fx-food-card__image"
                  />
                </div>

                <h3 className="fx-food-card__title">{slide.title}</h3>
                <p className="fx-food-card__subtitle">{slide.subtitle}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="fx-slider-dots">
        {realSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`fx-slider-dot ${activeDot === index ? "active" : ""}`}
            onClick={() => {
              stopAutoSlide();
              setTransitionEnabled(true);
              setCurrentIndex(index + 1);
              startAutoSlide();
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="fx-swipe-hint">
        <span className="fx-swipe-hint__hand">☝️</span>
        <span className="fx-swipe-hint__text">Swipe left / right</span>
      </div>
    </section>
  );
}