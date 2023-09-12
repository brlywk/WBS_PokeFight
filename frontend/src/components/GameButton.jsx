export default function GameButton({ label, onClick, children }) {
  return (
    <div className="p-2">
      <button
        onClick={onClick}
        className="bg-white bg-opacity-30 border-2 border-black rounded-2xl p-2 flex items-center gap-2 hover:bg-black hover:text-white w-[10vw]"
      >
        {children}
        {label}
      </button>
    </div>
  );
}
