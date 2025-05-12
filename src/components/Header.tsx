function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Weather Forecast App</h1>
        <p className="text-sm mt-1">
            Click on the map or use the search bar to find a location and view the forecast.
        </p>
        </header>
    );
}

export default Header;