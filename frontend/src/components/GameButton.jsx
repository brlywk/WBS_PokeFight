export default function GameButton({ label, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full min-w-max items-center gap-2 rounded-2xl border-2 border-black bg-white bg-opacity-30 p-2 backdrop-blur hover:bg-black hover:text-white"
    >
      {children}
      <div className="flex justify-start">{label}</div>
    </button>
  );
}
