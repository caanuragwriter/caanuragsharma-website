export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">
          CA Anurag Sharma
        </h1>

        <div className="flex gap-8 text-gray-700 font-medium">
          <a href="/">Home</a>
          <a href="/articles">Articles</a>
          <a href="/jobs">Jobs</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}