const features = [
  { title: "Smart Matching", desc: "AI-powered matching system to find your perfect event buddy." },
  { title: "Verified Profiles", desc: "Real users, verified via social logins for trust and safety." },
  { title: "Event Chat", desc: "Instant chat before and after the event to build real connections." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">Why Choose EventMate?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-6 bg-white/10 dark:bg-gray-800/50 rounded-2xl shadow-lg backdrop-blur-md border border-gray-200/20">
              <h3 className="text-xl font-semibold text-pink-500">{f.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
