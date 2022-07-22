const indexPage = ({ signUpMessage, loginMessage }) => {
  let color = 'red';

  if (signUpMessage && signUpMessage.includes('Successful')) {
    color = 'green';
  }

  const template = `<html>
  <head>
    <title>TODO</title>
    <link rel="stylesheet" href="styles/startPage.css">
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
          <h2>Stay Organized</h2>
          <h3>Stay Creative</h3>
        </div>
        <div class="get-started">
          <div class="auth" id="login">
            <div class="auth-heading">
              Already have an account?
            </div>
            <div id="login-message" class="message-area ${color}">${loginMessage ? loginMessage : ''}</div>
            <form id="login-form" action="/login" method="POST">
              <input type="text" name="name" id="name" placeholder="Enter your username" required>
              <input type="password" name="password" placeholder="Password" required>
              <section>
                <input type="submit" class="button" id="login-button" value="Login"/>
              </section>
            </form>
          </div>

          <div class="auth" id="sign-up">
            <div class="auth-heading">
              New user?
            </div>
            <div id="signUp-message" class="message-area ${color}">${signUpMessage ? signUpMessage : ''}</div>
            <form id="signUp-form" action="/sign-up" method="POST">
              <input type="text" name="name" id="name" placeholder="Enter your username" required>
              <input type="password" name="password" placeholder="Password" required>
              <section>
                <Input type="submit" id="register" class="button" value="Sign Up"/>
              </section>
            </form>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>`;

  return template;
};

module.exports = { indexPage };
