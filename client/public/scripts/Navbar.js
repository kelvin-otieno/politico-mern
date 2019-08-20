function navbar() {
  navmenu = `
    <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="index.html">Politico</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" >
          <a class="nav-link" href="index.html"
          >Home </span></a
          >
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Party
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="parties.html">Parties</a>
            <a class="dropdown-item" href="create_party.html">Create Party</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Office
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="offices.html">Offices</a>
            <a class="dropdown-item" href="create_office.html">Create Office</a>
          </div>
        </li>

        <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Candidate
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="candidates.html">Candidates</a>
          <a class="dropdown-item" href="create_candidate.html">Create Candidate</a>
        </div>
      </li>
      <li class="nav-item" >
          <a class="nav-link" href="vote.html"
          >Vote</a
          >
        </li>
        <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Petition
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="petitions.html">Petitions</a>
          <a class="dropdown-item" href="create_petition.html">Create Petition</a>
        </div>
      </li>

      
      </ul>
      <ul class="nav navbar-nav ml-auto mr-4">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src="images/user.png" class="rounded-circle user-logo" alt="" /> 
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="login.html">Login</a>
            <a class="dropdown-item" href="register.html">Register</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
    `;
  document.getElementsByTagName("header")[0].innerHTML = navmenu;
}
