export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} UFO Sightings Dashboard</p>
          <p className="mt-1">Built for Procode</p>
        </div>
      </div>
    </footer>
  );
};
