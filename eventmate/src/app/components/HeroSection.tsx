export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
        Find Your <span className="text-yellow-300">Perfect Event Partner</span> 🎉
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-white/90">
        EventMate connects you with people who share your vibe — join events, make friends, and create memories.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition">
          Explore Events
        </button>
        <button className="px-6 py-3 bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
