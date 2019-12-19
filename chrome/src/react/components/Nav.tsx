import React from 'react';

import SearchInput from '@/react/components/SearchInput';

const Nav: React.FC = () => {
  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item has-text-weight-bold">DMM History</div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field">
                <div className="control">
                  <SearchInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
