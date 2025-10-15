export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>© {new Date().getFullYear()} EventMate. All rights reserved.</p>
        <p className="text-sm mt-2">Made with ❤️ by the EventMate Team</p>
      </div>
    </footer>
  );
}
