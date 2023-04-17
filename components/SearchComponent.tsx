import React, { useState } from "react";

const SearchComponent = ({ allServers, setServers }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchValue = event.target.value.toLowerCase();
    const filtered = allServers.filter(
      (server) =>
        server.domain.toLowerCase().includes(searchValue) ||
        server.description.toLowerCase().includes(searchValue)
    );
    setServers(filtered);
  };

  return (
    <div className="flex items-center">
      <div className="flex border border-purple-200 rounded">
        <input
          type="text"
          className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        <button className="px-4 text-white bg-purple-600 border-l rounded ">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
