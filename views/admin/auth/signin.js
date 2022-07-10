const layout = require('../layout');
const { getError } = require('../../helpers');


module.exports = ({ errors }) => {
    return layout({ 
      content: `
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-quarter">
                    <form method="POST">
                        <h1 class="title">sign in</h1>
                        <div class="field">
                            <label class="label">email</label>
                            <input required class="input" name="email" placeholder="email" />
                            <p class="help is-danger">${getError(errors, 'email')}</p>
                        </div>
                        <div class="field">
                            <label class="label">password</label>
                            <input required class="input" name="password" type="password" placeholder="password" />
                            <p class="help is-danger">${getError(errors, 'passwprd')}</p>
                        </div>
                        <button class="button is-primary">Sign In</button>
                    </form>
                <a href="/signup">need an account? sign up</a>
            </div>
        </div>
    </div>
        `
     });
};