import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

/**
 * @module
 * Server Requests
 */
axios.interceptors.request.use(
  (config) => {
    const credConfig = config;
    credConfig.withCredentials = true;
    return credConfig;
  },
  (err) => Promise.reject(err),
);

export default {
  /**
   * Get the User's Currently Playing Track
   * @return {Object} An Object Containing info about the User's Current Playing Track
   */
  async fetchCurrentSong() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .get(`${api}/api/v1/me/player/currently-playing`, {}, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  /**
   * Get the User's Current playback info
   * @return {Object} An Object Containing info about the User's Current playback
   */
  async fetchCurrentPlayback() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .get(`${api}/api/v1/me/player`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  /**
   * Pause a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async pausePlayback() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/pause`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Start/Resume a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async startPlayback() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/play`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Skip User???s Playback To Next Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipNext() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .post(`${api}/api/v1/me/player/next`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Skip User???s Playback To Previous Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipPrevious() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .post(`${api}/api/v1/me/player/previous`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Toggle Shuffle For User???s Playback
   * @param {Boolean} state a Boolean containing the state wanted of shuffle
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleShuffle(state) {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/shuffle?state=${state}`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Set Repeat Mode On User???s Playback
   * @param {object} state track, context or off. track: will repeat the current track.
   * context: will repeat the current context. off: will turn repeat off.
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleRepeat(state) {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    // to be removed if changed later
    let statetemp;
    if (state === 'off') statetemp = false;
    else if (state === 'track') statetemp = true;
    return axios
      .put(`${api}/api/v1/me/player/repeat?state=${statetemp}`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Seek To Position In Currently Playing Track
   * @param {Number} position_ms Number of milliseconds to seek to
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async seekPosition(positionMs) {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/seek?position_ms=${positionMs}`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Set Volume For User's Playback
   * @param {Number} volumePercent the Volume percentage wanted from the player
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async setVolume(volumePercent) {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/volume?volume_percent=${volumePercent}`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Save a Liked Track to Server
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async saveTrack(ID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/tracks?ids=${ID}`, '', config)
      .then((response) => {
        if (response.status === 201) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * it sends a request to the server to set the current playing track
   * @param {string} ID the ID of the song played
   * @param {string} context The Type of the List played from
   * @param {string} contextID The ID of the Context
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async playTrack(ID, context, contextID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .post(
        `${api}/api/v1/me/player/track`,
        {
          trackId: ID,
          context_uri: `spotify:${context}:${contextID}`,
        },
        config,
      )
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },
  /**
   * Delete a Liked Track from Server
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async deleteTrack(ID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .delete(`${api}/api/v1/me/tracks?ids=${ID}`, config)
      .then((response) => {
        if (response.status === 200) return true;
        return false;
      })
      .catch(() => false);
  },
  /**
   * Delete a any Track from Server
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async deleteAnyTrack(ID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .delete(`${api}/api/v1/tracks/${ID}`, config)
      .then((response) => {
        if (response.status === 200) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Get an Ad from the Server
   * @return {String} the Image URL of the Ad
   */
  async getAd() {
    let link = 'https://searchengineland.com/figz/wp-content/seloads/2017/02/';
    link = `${link}google-adwords-green-outline-ad-2017-1920.png`;
    return axios
      .get(`${api}/api/v1/ads`)
      .then((response) => {
        if (response.status === 200) return response.data.ad.images[0].url;
        return link;
      })
      .catch(() => link);
  },

  /**
   * Check if the User Likes a certain Track
   * @param {string} ID the id of the track to be checked
   * @return {Boolean} a Boolean of the State of the track false if failed
   */
  async checkLiked(ID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .get(`${api}/api/v1/me/tracks/contains?ids=${ID}`, '', config)
      .then((response) => {
        if (response.status === 200) return response.data[0];
        return false;
      })
      .catch(() => false);
  },

  /**
   * Get all the albums saved by the user
   * @param {String} token Token of the current user
   */
  async fetchCurrentUserAlbum(token) {
    const userAlbum = await axios
      .get(`${api}/api/v1/me/albums?limit&offset`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userAlbum;
  },
  /**
   * Get All the playlists of the current user
   * @param {string} token Token of the current user
   */
  async fetchCurrentUserPlaylists(token) {
    const userPlaylists = await axios
      .get(`${api}/api/v1/me/playlists?limit=&offset=`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userPlaylists;
  },
  /**
   * Get All the playlists of the certain user
   * @param {string} userID Current User ID
   * @param {string} token Token of the current user
   */
  async fetchaListOfUserPlaylists(userID, token) {
    const userPlaylists = await axios
      .get(`${api}/api/v1/users/${userID}/playlists?limit=&offset=`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userPlaylists;
  },
  /**
   * Return the data of a specific user
   * @param {string} userID A user id
   * @param {string} token Token of the current user
   */
  async fetchaUserProfile(userID, token) {
    const userProfile = await axios
      .get(`${api}/api/v1/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userProfile;
  },
  /**
   * Get all the Artist followed by the user
   * @param {string} token Token of the current user
   */
  async fetchCurrentUserArtists(token) {
    const userArtists = await axios
      .get(`${api}/api/v1/me/following?type=artist&limit=20`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userArtists;
  },
  /**
   * Get all the info about specific artist
   * @param {string} id The artist ID
   */
  async fetchAnArtist(id) {
    const artists = await axios
      .get(`${api}/api/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => response.data);
    return artists;
  },

  /**
   * Return Albums of an artist
   * @param {String} id Album ID
   */
  async fetchArtistAlbums(id) {
    const artistAlbums = await axios
      .get(`${api}/api/v1/artists/${id}/albums?limit=&offset=`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => response.data);
    return artistAlbums;
  },
  /**
   * Get the artist related artist by passing the artist's ID
   * @param {string} id The artist ID that has other related artists
   * @param {string} token Token of the current user
   */
  async fetchArtistRelatedArtists(id, token) {
    const related = await axios
      .get(`${api}/api/v1/artists/${id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return related;
  },

  /**
   * Sends a POST request to the server to login the user
   * @param  {Object} data The user's credentials
   * @return {Object}      The corresponding response
   */
  async loginUser(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/authentication/login`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Creates a new playlists
   * @param {OBJECT} createdPlaylist The created playlist object
   */
  async createNewPlayList(createdPlaylist, token) {
    const response = await axios
      .post(`${api}/api/v1/users/playlists`, createdPlaylist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body)
      .catch((err) => console.log(err));

    return response;
  },

  /**
   * Creates a new Album
   * @param {Object} createdAlbum The Created Album object
   * @param {string} token The token of the user
   */
  async createNewAlbum(createdAlbum, token) {
    const response = await axios
      .post(`${api}/api/v1/albums`, createdAlbum, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body)
      .catch((err) => console.log(err));

    return response;
  },

  /**
   * Updates Album
   * @param {String} updatedAlbum the album object
   * @param {String} albumId the album id
   */
  async updateAlbum(updatedAlbum, albumId) {
    const response = await axios.patch(`${api}/api/v1/albums/${albumId}`, updatedAlbum, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    })
      .then((res) => res.body);

    return response;
  },

  /**
   * Create a new Track
   * @param {object} createdTrack The created Track
   * @param {String} token Token of current user
   */
  async createTrack(createdTrack, token) {
    const response = await axios.post(`${api}/api/v1/tracks`, createdTrack, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  /**
   * Upload a track
   * @param {data} formData The Data of the track
   * @param {String} token The token of the user
   */
  async uploadTrack(formData, token, progress) {
    const response = await axios
      .post(`${api}/api/v1/streaming`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        /* eslint no-param-reassign: "error" */
        onUploadProgress: (e) => {
          progress.songProgress = Math.round((e.loaded * 100) / e.total);
        },
      })
      .then((res) => res.body)
      .catch((err) => console.log(err));

    return response;
  },

  async uploadAlbumImage(formData, id, token) {
    const response = await axios
      .post(`${api}/api/v1/albums/${id}/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body)
      .catch((err) => console.log(err));

    return response;
  },

  /**
   * Follow Artists or Users
   * @param {String} ids IDs of artists or Users to follow
   * @param {String} token Token of current user
   */
  async followArtistsOrUsers(ids, token) {
    const response = await axios
      .put(`${api}/api/v1/me/following?type=artist`, ids, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body);
    return response;
  },

  /**
   * UnFollow Artists or Users
   * @param {String} ids IDs of artists or Users to Unfollow
   * @param {String} token Token of current user
   */
  async unfollowArtistsOrUsers(theid, token) {
    const response = await axios
      .delete(`${api}/api/v1/me/following?type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ids: theid,
        },
      })
      .then((res) => res.body);
    return response;
  },

  /**
   * Get Number of listens for tracks
   * @param {object} data Data needed
   */
  async fetchListensOfTracks(data) {
    const response = await axios
      .post(`${api}/api/v1/tracks/listens`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => res.data);
    return response;
  },

  /**
   * Get Number of Likes for tracks
   * @param {object} data Data needed
   */
  async fetchLikesOfTracks(data) {
    const response = await axios
      .post(`${api}/api/v1/tracks/likes`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => res.data);
    return response;
  },

  /**
   * Get Number of Listens for albums
   * @param {object} data Data needed
   */
  async fetchListensOfAlbums(data) {
    const response = await axios
      .post(`${api}/api/v1/albums/listens`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => res.data);
    return response;
  },

  /**
   * Get Number of Likes for albums
   * @param {object} data Data needed
   */
  async fetchLikesOfAlbums(data) {
    const response = await axios
      .post(`${api}/api/v1/albums/likes`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => res.data);
    return response;
  },

  /**
   * Check if Current User Follows Artists or Users
   * @param {String} ids IDs of artists or user which current user follows
   * @param {String} token Token of current user
   */
  async ifCurrentUserFollowsArtistsOrUsers(ids, token) {
    const isFollowing = await axios
      .get(`${api}/api/v1/me/following/contains?ids=${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
      });
    return isFollowing;
  },

  /**
   *
   * @param {string} id ID of the artist
   * @param {token} token Token of the current user
   */
  async getArtistAlbum(id, token) {
    const res = await axios
      .get(`${api}/api/v1/artists/${id}/albums?limit=&offset=`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
      });
    return res;
  },

  /**
   * Check if Users Follows a playlist
   * @param {String} userID ID of current user
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async ifUsersFollowsaPlaylist(userID, playlistID, token) {
    const response = await axios
      .get(`${api}/api/v1/playlists/${playlistID}/followers/contains?ids=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return response;
  },

  /**
   * Follow a playlist
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async followaPlaylist(playlistID, token) {
    const response = await axios
      .put(`${api}/api/v1/playlists/${playlistID}/followers`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body);
    return response;
  },

  /**
   * unFollow a playlist
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async UnfollowaPlaylist(playlistID, token) {
    const response = await axios
      .delete(`${api}/api/v1/playlists/${playlistID}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body);
    return response;
  },

  /**
   * Check if Users Follows an Album
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async ifUserFollowsAlbums(albumID, token) {
    const response = await axios
      .get(`${api}/api/v1/me/albums/contains?ids=${albumID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return response;
  },

  /**
   * Save an album for current user
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async saveAlbumsForCurrentUser(albumsID, token) {
    const response = await axios
      .put(`${api}/api/v1/me/albums?ids=${albumsID}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body);
    return response;
  },

  /**
   * Delete an album for current user
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async deleteAlbumsForCurrentUser(albumsID, token) {
    const response = await axios
      .delete(`${api}/api/v1/me/albums?ids=${albumsID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.body);
    return response;
  },

  /**
   * Sends a `POST` request to the server to signup the user
   * @param  {Object} data The user's signup data
   * @return {Object}      The corresponding response
   */
  async signupUser(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/authentication/signup`,
      data,
      headers: {
        'Content-Type': 'application/json',
        /**
         * @author XL3
         * This is my public IP address
         * @todo[XL3] Change this for production
         */
        'X-Forwarded-For': '156.215.87.252',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `POST` request to the server for a Reset Password token
   * @param  {Object} data The user's email
   * @return {Object}      The corresponding response
   */
  async forgotPassword(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/authentication/forgotPassword`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `PATCH` request to the server to reset the user's password
   * @param  {Object} data  The user's new password and its confirmation
   * @param  {Object} token The Password Reset token
   * @return {Object}       The corresponding response
   */
  async resetPassword(data, token) {
    const request = {
      method: 'PATCH',
      url: `${api}/api/v1/authentication/resetPassword/${token}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `PATCH` request to the server to update the current user's password
   * @param  {Object} data  The user's current password, new password and its confirmation
   * @param  {Object} token The Password Reset token
   * @return {Object}       The corresponding response
   */
  async updatePassword(data) {
    const request = {
      method: 'PATCH',
      url: `${api}/api/v1/authentication/updatePassword/`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `GET` request to the server for the current user's profile information
   * @return {Object} The corresponding response
   */
  async getCurrentUserProfile() {
    const request = {
      method: 'GET',
      url: `${api}/api/v1/users/me`,
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `PATCH` request to the server to update the user's profile data
   * @param  {Object} data The user's updated profile data
   * @return {Object} The corresponding response
   */
  async editProfile(data) {
    const request = {
      method: 'PATCH',
      url: `${api}/api/v1/users`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `POST` request to the server to update the user's avatar
   * @param  {Object} data The FormData object containing the image
   * @return {Object}      The corresponding response
   */
  async updateAvatar(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/users/update-avatar`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `GET` request to the server to log out the current user
   * @return {Object} The corresponding response
   */
  async logoutUser() {
    const request = {
      method: 'GET',
      url: `${api}/api/v1/authentication/logout`,
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `GET` request to the server to fetch the JWT token
   * @return {Object} The corresponding response
   */
  async fetchToken() {
    const request = {
      method: 'GET',
      url: `${api}/api/v1/authentication/token`,
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `POST` request to the server to update this device's notification token
   * @param  {Object} data The notification token
   * @return {Object}      The corresponding response
   */
  async sendNotificationToken(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/users/notification-token`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `DELETE` request to the server to remove a notification token
   * @param  {String} notificationToken The notification token to be deleted
   * @return {Object}                   The corresponding response
   */
  async deleteNotificationToken(notificationToken) {
    const request = {
      method: 'DELETE',
      url: `${api}/api/v1/users/notification-token/${notificationToken}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `POST` request to the server to enable/disable certain notifications
   * @param  {Object} data The types of notifications that need to be set
   * @return {Object}      The corresponding response
   */
  async setNotificationSettings(data) {
    const request = {
      method: 'POST',
      data,
      url: `${api}/api/v1/users/notification-toggle`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `GET` request to the server to get the user's notification status
   * @return {Object} The corresponding response
   */
  async fetchNotificationSettings() {
    const request = {
      method: 'GET',
      url: `${api}/api/v1/users/notification-status`,
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a `PATCH` request to the server to confirm the user's email on signup
   * @param  {String} confirmToken Email confirmation token that was sent by email
   * @return {Object}              The corresponding response
   */
  async confirmEmail(confirmToken) {
    const request = {
      method: 'PATCH',
      url: `${api}/api/v1/authentication/signup-confirm/${confirmToken}`,
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Fetches all songs of a playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of playlist
   * @return {Object}  An object containing all songs in a given playlist of ID equals to id
   */
  async fetchSongs(id) {
    const songs = await axios.get(`${api}/api/v1/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return songs.data.items;
  },
  /**
   * fetch a specific song
   * @param {string} id the id of the track
   * @return {object} object containing track info
   */
  async fetchTrack(id) {
    const res = await axios.get(`${api}/api/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Fetches user's saved tracks
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @return {Object}  An object containing all saved songs of the user
   */
  async fetchSavedTracks() {
    const songs = await axios
      .get(`${api}/api/v1/me/tracks`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return {
          data: {
            items: [
              {
                track: {
                  artists: [{ name: '' }],
                  album: {},
                  name: '',
                  duration_ms: 0,
                },
              },
            ],
          },
        };
      })
      .catch((error) => console.log(error));
    return songs.data.items;
  },

  /**
   * Fetches Current user Recently played tracks
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @return {Array} An Array containing Recently played tracks
   */
  async fetchRecentlyPlayedTracks() {
    const lists = await axios.get(
      `${api}/api/v1/me/player/recently-played?limit=20&before=1587256700923`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      },
    );
    return lists.data.items;
  },

  /**
   * Fetches Current user Recently played Lists
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @return {Array} An Array containing Recently played Lists
   */
  async fetchRecentlyPlayedLists(limit) {
    const lists = await axios.get(
      `${api}/api/v1/me/player/recently-played-contexts?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      },
    );
    const promises = [];
    const data = [];
    for (let i = 0; i < lists.data.playContexts.length; i += 1) {
      const arr = lists.data.playContexts[i].uri.split(':');
      if (arr[1] === 'album') {
        promises.push(this.fetchAlbum(arr[2]).then((res) => data.push(res)));
      } else {
        promises.push(this.fetchList(arr[2]).then((res) => data.push(res)));
      }
    }
    await Promise.all(data);
    return data;
  },

  /**
   * Fetches List info
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the desired list
   * @return {Object} An object containing all information about the list of ID equals to id
   */
  async fetchList(id) {
    const lists = await axios.get(`${api}/api/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return lists.data;
  },

  /**
   * Fetches Album info
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the desired Album
   * @return {Object} An object containing all information about the album of ID equals to id
   */
  async fetchAlbum(id) {
    const Album = await axios.get(`${api}/api/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return Album.data;
  },

  /**
   * Get tracks of certain album
   * @param {String} id ID of the album to get tracks of
   */
  async fetchAlbumTracks(id) {
    const track = await axios.get(`${api}/api/v1/albums/${id}/tracks?offset=&limit=`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return track.data;
  },

  /**
   * Fetches Album songs
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the desired Album
   * @return {Object} An object containing all songs of the album of ID equals to id
   */
  async fetchAlbumSongs(id) {
    // eslint-disable-next-line no-undef
    const album = await this.fetchAlbum(id);
    const songs = [];
    for (let i = 0; i < album.tracks.length; i += 1) {
      // album.tracks[i].artists = [{ name: 'Artist' }];
      album.tracks[i].album = {
        artists: album.tracks[i].artists,
        images: album.images,
        name: album.name,
      };
      songs[i] = { track: album.tracks[i] };
    }
    return songs;
  },

  /**
   * Returns the top tracks of an artist
   * @param {String} id ID of the artist
   */
  async fetchArtistTopTracks(id) {
    const artistSongs = await axios.get(`${api}/api/v1/artists/${id}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });

    for (let i = 0; i < artistSongs.data.length; i += 1) {
      artistSongs.data[i].track = artistSongs.data[i];
    }

    return artistSongs.data;
  },

  /**
   * Save Track for the Current User
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Track
   * @return {Object}  The corresponding response
   */
  async SaveTrack(id) {
    const res = await axios.put(`${api}/api/v1/me/tracks?ids=${id}`, '', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Remove Track for the Current User
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Track
   * @return {Boolean}  The corresponding response
   */
  async RemoveTrack(id) {
    const res = await axios
      .delete(`${api}/api/v1/me/tracks?ids=${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) return true;
        return false;
      })
      .catch(() => false);
    return res;
  },

  /**
   * Save Album for the Current User
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async SaveAlbum(id) {
    const res = await axios.put(`${api}/api/v1/me/albums?ids=${id}`, '', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Remove Album for the Current User
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async RemoveAlbum(id) {
    const res = await axios.delete(`${api}/api/v1/me/albums?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Remove Album for the ant User
   * @param  {Number}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async RemoveAnyAlbum(id) {
    const res = await axios.delete(`${api}/api/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Check if Album is Saved for the Current User or not
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async CheckAlbum(id) {
    const response = await axios
      .get(`${api}/api/v1/me/albums/contains?ids=${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return [false];
      })
      .catch(() => [false]);
    return response;
  },

  /**
   * Check if a Playlist is Saved for the Current User or not
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Playlist
   * @return {Object}  The corresponding response
   */
  async CheckPlaylist(id) {
    /* eslint-disable no-underscore-dangle */
    const response = await axios.get(
      `${api}/api/v1/playlists/${id}/followers/contains?ids=${
        JSON.parse(localStorage.getItem('currentUser')).data._id
      }`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      },
    );
    return response;
  },

  /**
   * Follow a Playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Playlist
   * @return {Object}  The corresponding response
   */
  async FollowPlaylist(id) {
    const response = await axios.put(`${api}/api/v1/playlists/${id}/followers`, '', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return response;
  },

  /**
   * Unfollow a Playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  id The id of the Playlist
   * @return {Object}  The corresponding response
   */
  async UnfollowPlaylist(id) {
    const response = await axios.delete(`${api}/api/v1/playlists/${id}/followers`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return response;
  },

  /**
   * Add Track to a Playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  listId The id of the Playlist
   * @param  {String}  trackId the id of the track
   * @return {Boolean}  The corresponding response
   */
  async AddTrackToPlaylist(listId, trackId) {
    const response = await axios
      .post(
        `${api}/api/v1/playlists/${listId}/tracks`,
        {
          ids: [trackId],
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 201) return true;
        return false;
      })
      .catch(() => false);
    return response;
  },

  /**
   * Remove Track from a Playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {String}  listId The id of the Playlist
   * @param  {String}  trackId the id of the track
   * @param  {Number}  position the position of the track in the list
   * @return {Boolean}  The corresponding response
   */
  async RemoveTrackFromPlaylist(listId, trackId, position) {
    const response = axios
      .delete(`${api}/api/v1/playlists/${listId}/tracks`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        data: {
          tracks: [
            {
              id: trackId,
              positions: [position],
            },
          ],
        },
      })
      .then((res) => {
        if (res.status === 200) return true;
        return false;
      })
      .catch(() => false);
    return response;
  },

  /**
   * Get New Releases of albums
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @return {Array} Array on new releases
   */
  async fetchNewReleases() {
    const response = await axios.get(`${api}/api/v1/browse/new-releases?limit=40`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return response.data.albums;
  },

  /**
   * Get list of recommended tracks
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @return {Array} Array on recommended tracks
   */
  async fetchRecommendedTracks() {
    const response = await axios.get(`${api}/api/v1/tracks/recommend`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    for (let i = 0; i < response.data.length; i += 1) {
      response.data[i] = { track: response.data[i] };
    }
    return response.data;
  },

  /**
   * Change details of a Playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {Number}  id The id of the Playlist
   * @param  {Object}  body The data to be changed
   * @return {Object}  The corresponding response
   */
  async ChangeDetailsOfPlaylist(id, body) {
    const response = axios
      .put(`${api}/api/v1/playlists/${id}`, body, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) return true;
        return false;
      })
      .catch(() => false);
    return response;
  },

  /**
   * Upload Custom Image to Playlist
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   * @param  {Number}  id The id of the Playlist
   * @param  {formData}  formData The data of the image
   * @return {Object}  The corresponding response
   */
  async uploadPlaylistImage(formData, id) {
    const response = await axios
      .post(`${api}/api/v1/playlists/${id}/images`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((res) => res.body)
      .catch((err) => console.log(err));
    return response;
  },

  /**
   * Gets all categories (genres)
   * @return {object} an object containing all the genres
   */
  async fetchGenres() {
    return axios
      .get(`${api}/api/v1/browse/categories`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  /**
   * Fetch a specific genre in the mock data
   * @param {string} id a string that contains the id of the genre
   * @return {object} an object containing necessary data about genre
   */
  async fetchGenre(id) {
    return axios
      .get(`${api}/api/v1/browse/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  /**
   * Fetches all playlists related to a specific Category
   * @param {string} id string that contains the id of the category
   * @return {Array} an Array containing all playlists
   */
  async fetchCategoryPlaylists(id) {
    return axios
      .get(`${api}/api/v1/browse/categories/${id}/playlists?country=EG&limit=20&offset=0`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  /**
   * Fetch related data to the user input for search
   * @param {string} search a string that contains the data the user search for
   * @return {object} an aboject that may have related data to user search
   */
  async fetchSearch(search) {
    let q = search;
    let key = '';
    let z = 'track,artist,album,playlist,user';
    if (search.includes('track')) {
      z = 'track';
      key = 'track';
      if (search.includes('tracks')) {
        key += 's';
      }
      q = q.replace(key, '');
    }
    if (search.includes('artist')) {
      if (z === 'track,artist,album,playlist,user') {
        z = 'artist';
      } else {
        z += ',artist';
      }
      key = ' artist';
      if (search.includes('artists')) {
        key += 's';
      }
      q = q.replace(key, '');
    }
    if (search.includes('album')) {
      if (z === 'track,artist,album,playlist,user') {
        z = 'album';
      } else {
        z += ',album';
      }
      key = 'album';
      if (search.includes('albums')) {
        key += 's';
      }
      q = q.replace(key, '');
    }
    if (search.includes('playlist')) {
      if (z === 'track,artist,album,playlist,user') {
        z = 'playlist';
      } else {
        z += ',playlist';
      }
      key = 'playlist';
      if (search.includes('playlists')) {
        key += 's';
      }
      q = q.replace(key, '');
    }
    if (search.includes('user')) {
      if (z === 'track,artist,album,playlist,user') {
        z = 'user';
      } else {
        z += ',user';
      }
      key = 'user';
      if (search.includes('users')) {
        key += 's';
      }
      q = q.replace(key, '');
    }
    return axios
      .get(`${api}/api/v1/search?q=${q}&type=${z}&limit=6&offset=0`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => console.log(error));
  },
  /**
   * sends premium request to server to get an email sent to user's email
   */
  async premiumRequest() {
    return axios
      .patch(`${api}/api/v1/users/premium`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.status);
        return response.status;
      })
      .catch((error) => console.log(error));
  },
  /**
   * sends premium token to server to verify the user's upgrade
   * @param {string} premiumToken token given in the e-mail
   */
  async setPremium(premiumToken) {
    return axios
      .post(`${api}/api/v1/users/premium/${premiumToken}`)
      .then((response) => response.status)
      .catch((error) => console.log(error));
  },
};
