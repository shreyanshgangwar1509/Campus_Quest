export default function TeamCard({ name, description, members, createdAt }) {
  return (
    <div className="w-full p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 text-sm text-gray-500">Members: {members.join(", ")}</p>
      <p className="mt-2 text-xs text-gray-400">Created at: {new Date(createdAt).toLocaleDateString()}</p>
      
    </div>
  );
}
