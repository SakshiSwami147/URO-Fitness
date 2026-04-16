export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-condensed text-[0.7rem] font-bold tracking-[6px] text-yellow uppercase mb-3">
      <span className="w-8 h-0.5 bg-yellow block flex-shrink-0" />
      {children}
    </div>
  );
}
