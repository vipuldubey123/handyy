function loginSignup() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const btn = document.querySelector('#cls')


    

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        btn.style.color='#111'


    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        btn.style.color = '#fff'


    });


}

function accountClickShow() {

    let acc = document.querySelector('.account-login-signup')

    let accPage = document.querySelector('.acc-main')

    acc.addEventListener('click', function () {

        accPage.style.display = 'flex'
    })
}


loginSignup();