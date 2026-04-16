export default function Marquee({ items }: { items: string[] }) {
  // Double the items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div className="bg-yellow overflow-hidden py-4">
      <div className="flex animate-marquee w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-bebas text-[1.1rem] tracking-[4px] text-black px-12 whitespace-nowrap"
          >
            {item}
            <span className="ml-12 text-[0.6rem] text-black/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
