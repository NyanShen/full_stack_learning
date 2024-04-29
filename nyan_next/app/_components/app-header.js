export default function AppHeader() {
  return (
    <header className="px-8">
      <nav className="flex flex-col md:flex-row">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}