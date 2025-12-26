import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // lock scroll while preloader is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // unlock scroll + tell app to hide preloader
        document.body.style.overflow = prevOverflow || "";
        onDone?.();
      },
    });

    const speed = 1.2;
    const phases = [
      { n2: [2, 3, 4], n3: [1, 5] },
      { n2: [5, 6], n3: [7, 8, 9] },
    ];

    phases.forEach(({ n2, n3 }, index) => {
      const secondDigit = gsap.utils.random(n2);
      const thirdDigit = gsap.utils.random(n3);

      tl.to(
        rootRef.current.querySelector(".number-2 .number-wrap"),
        { duration: speed, yPercent: (secondDigit - 1) * -10, ease: "power2.inOut" },
        ">"
      );

      tl.to(
        rootRef.current.querySelector(".number-3 .number-wrap"),
        { duration: speed, yPercent: (thirdDigit - 1) * -10, ease: "power2.inOut" },
        "<"
      );

      tl.to(
        rootRef.current.querySelector(`.pre-welcome .line:nth-child(${index + 1}) p`),
        { duration: speed / 2, y: 0, ease: "power2.out" },
        "<"
      );

      tl.to(
        rootRef.current.querySelector(".progress-bar"),
        { duration: speed, width: `${secondDigit * 10 + thirdDigit}%`, ease: "power2.inOut" },
        "<"
      );
    });

    tl.to(
      [
        rootRef.current.querySelector(".number-2 .number-wrap"),
        rootRef.current.querySelector(".number-3 .number-wrap"),
      ],
      { duration: speed, yPercent: -90, ease: "power2.inOut" },
      ">"
    );

    tl.to(
      rootRef.current.querySelector(".progress-bar"),
      { duration: speed, width: "100%", ease: "power2.inOut" },
      "<"
    );

    tl.to(rootRef.current.querySelector(".number-1 .number-wrap"), { duration: speed, y: 0, ease: "power2.out" }, "<")
      .to(
        rootRef.current.querySelectorAll(".number-wrap, .loading-screen .numbers"),
        { duration: speed, yPercent: -100, ease: "power2.inOut" },
        ">"
      )
      .to(rootRef.current.querySelector(".percentage"), { duration: speed, yPercent: -100, ease: "power2.inOut" }, "<")
      .to(
        rootRef.current.querySelectorAll(".pre-welcome .line p"),
        { duration: speed / 2, yPercent: -100, stagger: 0.2, ease: "power2.inOut" },
        "<"
      )
      .to(rootRef.current.querySelector(".progress-bar"), { duration: speed / 1.5, height: "100%", ease: "power2.inOut" })
      .to(
        rootRef.current.querySelectorAll(".welcome .line p"),
        { duration: speed / 2, y: 0, stagger: 0.2, ease: "power2.out" },
        ">"
      )
      // fade out whole loader at the end
      .to(rootRef.current, { duration: 0.35, opacity: 0, pointerEvents: "none" }, ">");

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow || "";
    };
  }, [onDone]);

  return (
    <div ref={rootRef} className="cp-preloader">
      <div className="loading-screen">
        <div className="progress-bar" />

        <div className="pre-welcome">
          <div className="line">
            <p>Chase your dreams -</p>
          </div>
          <div className="line">
            <p>They're running to meet you.</p>
          </div>
        </div>

        <div className="welcome">
          <div className="line">
            <p>
              You chased your <span className="bold">dreams -</span>
            </p>
          </div>
          <div className="line">
            <p>
              Now let's make them <span className="bold">reality.</span>
            </p>
          </div>
        </div>

        <div className="numbers">
          <div className="number number-1">
            <div className="number-wrap">
              <span>1</span>
            </div>
          </div>

          <div className="number number-2">
            <div className="number-wrap">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              <span>6</span><span>7</span><span>8</span><span>9</span><span>0</span>
            </div>
          </div>

          <div className="number number-3">
            <div className="number-wrap">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              <span>6</span><span>7</span><span>8</span><span>9</span><span>0</span>
            </div>
          </div>

          <div className="percentage">%</div>
        </div>
      </div>
    </div>
  );
}