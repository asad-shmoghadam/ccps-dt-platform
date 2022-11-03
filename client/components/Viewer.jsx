// Use the Forge Viewer jsx, to change the login button IMG, to the user's profile JPG image.

function initializeViewer() {
    var options = {
        env: props.env,
        api: "derivativeV2", // for models uploaded to EMEA, change this option to 'derivativeV2_EU'
        getAccessToken: function (onTokenReady) {
            fetch(`${ApplicationContext.fargateUrl}/api/token?refresh=${localStorage['refresh']}`).then(res => {
                res.json().then(data => {
                    if (data.picture) {
                        //localStorage['refresh'] = data.refresh_token;
                        const el = document.getElementById("bim360button");
                        if (el) {
                            el.src = data.picture;
                            el.nextSibling.textContent = data.username;
                        }
                    }
                    onTokenReady(data.access_token, data.expires_in);
                });
            })
        },
    }
};

export default initializeViewer;


