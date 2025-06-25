export default function EventCard({ event }) {
  return (
    <div className="text-xs bg-yellow-200 p-1 rounded mb-1">
      <strong>{event.time}</strong> - {event.title}
    </div>
  );
}
