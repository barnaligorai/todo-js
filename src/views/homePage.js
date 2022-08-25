const home = (username) => `<html>
<head>
  <title>TODO</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="styles/home.css">
  <script src="js/addList.js"></script>
  <script src="js/todoActions.js"></script>
  <script src="js/generateElements.js"></script>
  <script src="js/edit.js"></script>
  <script src="js/search.js"></script>
</head>
<body>
  <div class="body">
    <header>
    <h1>TODO</h1>
    <div class="user">Hello ${username}</div>
    <form class="search-form" id="search-form">
    <input class="search-bar" type="text" name="query" placeholder="search here"/>
    <select name="search-for" class="search-options">
      <option value="list" selected>list</option>
      <option value="task">task</option>
    </select>
    </form>
    <a href="/logout" class="logout material-icons">logout</a>
    </header>
    <main>
      <div class="add-and-filter">
        <form id="add-list">
          <input type="text" name="title" placeholder="Add a new list" required>
        </form>
        <div class="filter">
          <label for="filter-by">Filter :</label>
          <select name="filter-by" form="search-form">
            <option value="all" selected>all</option>
            <option value="done">done</option>
            <option value="undone">undone</option>
          </select>
        </div>
      </div>
      <div class="lists">
    </div>
    </main>
  </div>
</body>
</html>`;

module.exports = { home };
