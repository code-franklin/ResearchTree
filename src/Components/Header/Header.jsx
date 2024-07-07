import React from 'react';
import Cards from './Cards';
import YearDropdown from './YearDropdown';
function Header() {
    return (
        <div className="App">
            <YearDropdown />
            <Cards />
        </div>
    );
}

export default Header;
