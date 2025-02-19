import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import SearchResults from '../SearchResults/SearchResults';
import axios from "axios";

function Header({ baseUrl, apiKey }) {
  const { user, token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [profileOptions, setProfileOptions] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(res => {
          setSearchResults(res.data.results);
        })
        .catch(err => console.log(err));
    }
  }, [query]);

  // function to handle the dark/light mode
  const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
    navigate('/');
  };

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
      <Link className="logo" to="/">Netflix</Link>

      <div className="search-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`search-input ${query && "input-active"} ${!query && !darkMode && query}`}
          placeholder="Search movies..."
        />
        {query.trim() !== "" && (
          <div className="search-results-container">
            {searchResults.map((movie) => (
              <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <div className="header-buttons-container">
        <div className="theme-button-container">
          {darkMode ? (
            <div className="theme-buttons">
              <MdOutlineLightMode onClick={handleTheme} className="theme-icon" />
              <MdOutlineDarkMode className="theme-icon theme-icon-active" />
            </div>
          ) : (
            <div className="theme-buttons">
              <MdOutlineLightMode className="theme-icon theme-icon-active" />
              <MdOutlineDarkMode onClick={handleTheme} className="theme-icon" />
            </div>
          )}
        </div>

       
        {token ? (
          <div className="profile-section">
            <span onClick={() => setProfileOptions(!profileOptions)} className="profile-name">
              {user?.name || 'Profile'}
            </span>
            {profileOptions && (
              <div className="profile-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
            <div className="auth-section">
    <Link to="/signin" className="signin-button">
      <button className="signin-btn">Sign In</button>
    </Link>
  </div>

        )}
      </div>
    </div>
  );
}

export default Header;
