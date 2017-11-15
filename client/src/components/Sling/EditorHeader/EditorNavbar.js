import React from 'react';

const EditorNavbar = () => (

  <nav className="editor-navbar">
    <ul>
      <li className="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="dropdown" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Dropdown link
        </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" id='retro-theme'>Retro</a>
          <a className="dropdown-item" id=''>Comic</a>
          <a className="dropdown-item" id=''>H4x0r</a>
          <a className="dropdown-item" id=''>Add More Themes later</a>
        </div>
      </li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </nav>

);

export default EditorNavbar;
