

import React from "react";
import { Viewer } from "forge-dataviz-iot-react-components";

function LoginBIM360() {
    async function onLoginClick() {
        const res = await fetch(`/oauth/url`);
        const url = await res.text();
        console.log(url);
        location.href = url;
    }

    return (
        <React.Fragment>
            <button class="login" id="autodeskSigninButton" onClick={onLoginClick}>
                <img id="bim360button" src="https://github.com/Autodesk-Forge/bim360appstore-data.management-nodejs-transfer.storage/raw/master/www/img/autodesk_text.png"
                     height="20"/> Sign in
            </button>
        </React.Fragment>
    );
}

export default LoginBIM360;
