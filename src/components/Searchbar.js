import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const Searchbar = () => {
  const [profileSearch, setProfileSearch] = useState('');
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate(`/p/${profileSearch}`);
  };

  return (
    <div className="hidden shrink bg-gray-100 px-5 rounded-lg text-gray-400  xl:justify-center md:flex">
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        onClick={searchHandler}
      >
        <AiOutlineSearch />
      </button>
      <input
        type="text"
        className="active:bg-transparent focus:bg-transparent focus:outline-none placeholder:text-gray-400 bg-transparent  text-black border-none w-full p-2"
        placeholder="Search"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        onChange={(e) => setProfileSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') searchHandler();
        }}
      />
    </div>
  );
};

export default Searchbar;
