window.fbAsyncInit = function () {
    FB.init({
        appId: '407360182353370', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v20.0'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        fetchUserProfile(response.authResponse.accessToken);
    } else {
        document.getElementById('status').innerHTML = 'Not logged in.';
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('profileDetails').style.display = 'none';
    }
}

function fetchUserProfile(accessToken) {
    FB.api('/me', { fields: 'id,name,email,picture', access_token: accessToken }, function (response) {
        if (response && !response.error) {
            document.getElementById('status').innerHTML = 'Hello, ' + response.name;
            document.getElementById('profileId').textContent = response.id;
            document.getElementById('profileName').textContent = response.name;
            document.getElementById('profileEmail').textContent = response.email;
            document.getElementById('profilePic').src = response.picture.data.url;

            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'block';
            document.getElementById('profileDetails').style.display = 'block';
        } else {
            document.getElementById('status').innerHTML = 'Error fetching user profile';
        }
    });
}

document.getElementById('loginBtn').onclick = function () {
    FB.login(function (response) {
        if (response.authResponse) {
            fetchUserProfile(response.authResponse.accessToken);
        } else {
            console.log('User cancelled login or failed.');
        }
    }, { scope: 'public_profile,email' }); // Requesting 'public_profile' and 'email' permissions
}

document.getElementById('logoutBtn').onclick = function () {
    FB.logout(function (response) {
        document.getElementById('status').innerHTML = 'You have logged out.';
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('profileDetails').style.display = 'none';
    });
}
