async function loginHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const email =document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#pw-login').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        //check response status
        if (response.ok) {
            console.log('success');
            document.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

async function signupHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#create-email').value.trim();
    const password = document.querySelector('#create-pw').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                emial,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusType);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);