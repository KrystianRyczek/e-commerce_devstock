export default function Comment({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  return (
    <label htmlFor={`comment+${name}`}>
      <input
        name={name}
        placeholder="Add a comment about your order..."
        type="hidden"
        id={`comment+${name}`}
        defaultValue={defaultValue}
      />
    </label>
  );
}
