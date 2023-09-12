export default function SpDisplay({ amount }) {
  const fillArray = new Array(amount).fill(0).map((_, i) => i + 1);

  return (
    <div className="flex flex-row justify-center align-center gap-1">
      {fillArray.map((sp) => (
        <img key={sp} src="/pokeball.png" alt="1 SP" className="w-4 h-4" />
      ))}
    </div>
  );
}
//
