const home = (username) => `<html>
<head>
  <title>TODO</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="styles/home.css">
  <script src="js/addList.js"></script>
  <script src="js/todoActions.js"></script>
  <script src="js/generateElements.js"></script>
</head>
<body>
  <div class="body">
    <header>
      <h1>TODO</h1>
      <div class="user">
          <div class="username">${username}</div>
          <a href="/logout" class="logout material-icons">logout</a>
      </div>
    </header>
    <main>
      <form id="add-list">
        <input type="text" name="title" placeholder="Add a new list">
      </form>
      <div class="lists">
      </div>
    </main>
  </div>
</body>
</html>`;

module.exports = { home };
