export default function Widgets({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
