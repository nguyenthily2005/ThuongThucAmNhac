import * as Layout from '../Components/layout.js';
import Router from '../Components/router/router.js';

import * as PageLoader from '../Components/loader.js';
import SongPlayer from '../Features/musicplayer/songplayer.class.js';
import * as SongService from './service/songService/songServices.js';
import * as UserService from './service/userService/userServices.js';
import * as AccessTokenService from './service/accessTokenService/accessTokenService.js';


let songPlayer = undefined;
const router = Router.getInstance();

/**
 * Add default route
 */
const routerConfiuration = () => {
    router.createRoute('login', './Views/Pages/login.html');
    router.createRoute('register', './Views/Pages/logup.html');
    router.createRoute('logup', './Views/Pages/logup.html');
    router.createRoute('change-password', '/Views/pages/changePassword.html')
    router.createRoute('confirm', '/Views/pages/verifyOTP.html')

    router.createRoute('admin2', './_Admin/dist/index.html');
    router.createRoute('admin2/form', './_Admin/dist/index.html');

    router.createSpecialPage('admin2')
}


/**
 * onStart is the main function of this javascript file. That means onStart will be called first.
 */
const onStart = async () => {
    console.debug('checkpoint 1')
    routerConfiuration();
    if ((await router.autoRoute())) {
    } else {
        let songPlayer = SongPlayer.getSongPlayer();

        let isLoaded = await UserService.getUserProfile();
        if (!isLoaded) {
            AccessTokenService.refreshAccessToken()
        }


        Layout.onStart();

        PageLoader.loadPosition();
        PageLoader.reloadContent();


        let songData = (await SongService.getSuggestionSong()).data;
        console.log(songData)
        songPlayer.addSongsToQueue(songData);
        songPlayer.loadSong();

    }
}

await onStart()