const LINES = [
  { text: "Before the flowers.", strong: false },
  { text: "Before the celebration.", strong: false },
  { text: "They see the invitation.", strong: true },
];

const Line = ({ strong, children }) => {
  return (
    <p
      data-gsap-line
      className={
        strong
          ? "font-serif italic text-espresso leading-[1.1] text-4xl sm:text-6xl lg:text-7xl"
          : "font-serif text-taupe/80 leading-tight text-2xl sm:text-3xl lg:text-4xl"
      }
    >
      {children}
    </p>
  );
};

export const ScrollMoment = () => {
  return (
    <section
      data-testid="scroll-moment"
      data-gsap-scene="moment"
      className="relative bg-ivory py-28 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <Line>{LINES[0].text}</Line>
          <Line>{LINES[1].text}</Line>
          <Line strong>{LINES[2].text}</Line>
        </div>
      </div>
    </section>
  );
};
