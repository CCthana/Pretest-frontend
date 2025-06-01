import { useState } from "react";
import { SearchIcon } from "./Icons";

interface SearchboxProps {
  onSearch: (quote: string) => void;
}

const Searchbox: React.FC<SearchboxProps> = ({ onSearch }) => {
  const [searchQuote, setSearchQuote] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuote(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuote);

    setSearchQuote(""); 
  };

  return (
    <div className="bg-white py-3 px-4 rounded-xl flex items-center w-2/6 shadow-xl">
      <input
        className="w-full outline-none px-2 text-sm font-semibold"
        maxLength={45}
        value={searchQuote}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} className="hover:cursor-pointer">
        <SearchIcon className="w-5" />
      </button>
    </div>
  );
};

export default Searchbox;
