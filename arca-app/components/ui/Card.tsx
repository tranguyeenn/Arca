const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-900/85 border border-slate-400/15 rounded-2xl p-[18px] text-gray-200 text-sm leading-[1.45] relative shadow-[0_10px_30px_rgba(2,6,23,0.6),inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-indigo-500/35 hover:shadow-[0_12px_36px_rgba(2,6,23,0.75),inset_0_1px_0_rgba(255,255,255,0.04)]">
      {children}
    </div>
  );
};

export default Card;

