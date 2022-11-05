import SpotifyWebApi from "spotify-web-api-js";
import cryptoUtils from "./cryptoUtils";
const authorizationUrl = "https://accounts.spotify.com/authorize?";
const redirectUrl = "http://localhost:5173/loginCallback";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const accessTokenUrl = "https://accounts.spotify.com/api/token";
import { useUserStore } from "../stores/user";

const spotifyApi = new SpotifyWebApi();

const spotifyLogin = () => {
  const scope = "user-read-private user-read-email";

  const paramsObj = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUrl,
    state: cryptoUtils.generateId(16),
  };
  const searchParams = new URLSearchParams(paramsObj);

  window.location.href = authorizationUrl + searchParams.toString();
};

const getAccessToken = async (code) => {
  const body = {
    code: code,
    redirect_uri: redirectUrl,
    grant_type: "authorization_code",
  };

  const authHeader = "Basic " + window.btoa(clientId + ":" + clientSecret);

  const res = await fetch(accessTokenUrl, {
    method: "POST",
    body: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
    },
  });

  const data = await res.json();
  const userStore = useUserStore();
  spotifyApi.setAccessToken(data.access_token);
  const userDetails = await spotifyApi.getMe();
  userStore.login(userDetails.id, data.access_token);
  getUserPlaylists(userDetails.id);
};

const getArtistAlbums = (id) => {
  spotifyApi.getArtistAlbums(id).then(
    function (data) {
      console.log("Artist albums", data);
    },
    function (err) {
      console.error(err);
    }
  );
};

const getUserPlaylists = () => {
  const userStore = useUserStore();
  return spotifyApi.getUserPlaylists(userStore.id).then(
    function (data) {
      return data;
    },
    function (err) {
      console.error(err);
    }
  );
};

const getPlaylist = (id) => {
  return spotifyApi.getPlaylist(id).then(
    function (data) {
      return data;
    },
    function (err) {
      console.error(err);
    }
  );
};

export default {
  spotifyLogin,
  getAccessToken,
  getArtistAlbums,
  getUserPlaylists,
  getPlaylist,
};
