const loginPage = ({ loginMessage }) => {
  const loginTemplate = `<html>
<head>
  <title>TODO</title>
  <link rel="stylesheet" href="styles/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
  <div class="body">
    <header>
      <h1>
        TODO
      </h1>
    </header>
    <main>
      <div class="about">
        <h3>Stay organized. Stay creative.</h3>
      </div>
      <div class="card">
        <div class="heading">
          <h3 class="">Login</h3>
        </div>
        <div class="message-area">${loginMessage ? loginMessage : ''}</div>
          <form action="/login" method="POST">
            <input type="text" name="name" id="name" placeholder="Enter your username" required>
            <input type="password" name="password" placeholder="Password" required>
            <section>
              <input type="submit" class="button" value="Login"/>
            </section>
          </form>
          <div class="signup">
            Need an account? <a href="/sign-up">Sign up</a>
          </div>
      </div>
    </main>
  </div>
</body>
</html>
`
  return loginTemplate;
};

module.exports = { loginPage };
