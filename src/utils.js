import properties from "./properties";

/**
 * 
 * @param {http method: GET, POST, PUT or DELETE} method 
 * @param {boolean} withToken 
 * @param {request body object to send to the server} body 
 * @returns a new options object to be used in the fetchAll method (or any fetch with modifying behaviour)
 */
const makeOptions = (method, withToken, body) => {
  method = method ? method : 'GET';
  var opts = {
    method: method,
    headers: {
      ...(['PUT', 'POST'].includes(method) && { //using spread operator to conditionally add member to headers object.
        "Content-type": "application/json"
      }),
      "Accept": "application/json"
    }
  }
  if (withToken && loggedIn()) {
    opts.headers["x-access-token"] = getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

/**
 * 
 * @param {The http response returned from fetch()} res 
 * @returns the response body if status=200 or a new rejected promise
 */
const handleHttpErrors = (res) => {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

/**
 * 
 * @param {the url to fetch} url 
 * @param {the function to call when server response comes} callback 
 * @param {http method: GET, POST, PUT or DELETE} method 
 * @param {boolean} withToken 
 * @param {request body object to send to server} body 
 * @param { a function to use for logging out if the token is expired} logout 
 * makes a fetch call to the server url and sends the response to the callback function.
 */
const fetchAny = (url, callback, method, withToken, body, logout) => {
  if (properties.backendURL)
    url = properties.backendURL + url;
  const options = makeOptions(method, withToken, body);
  fetch(url, options)
    .then(res => handleHttpErrors(res))
    .then(data => callback(data))
    .catch(err => {
      if (err.status) {
        err.fullError.then(e =>{
          if(Number(e.code) === 403) alert('You need to login again (token may have timed out). Logout and in again'); //logout();
        });//+JSON.stringify(e)));
      }
      else { console.log("Network error"); }
    }
    );
}

/**
 * 
 * @param {string: username} user 
 * @param {string: password} password 
 * @param {function to call for reporting back} setLoggedIn 
 * @returns 
 */
const login = (user, password, setLoggedIn) => {
  return fetchAny(
    properties.cloudURL + "login"
    , res => { _setToken(res.token); setLoggedIn(true); }
    , 'POST'
    , true
    ,  { username: user, password: password }
    )
}

const _setToken = (token) => {
  localStorage.setItem('jwtToken', token)
}

/**
 * 
 * @returns the token wich contains the username and roles.
 */
const getToken = () => {
  return localStorage.getItem('jwtToken')
}

const loggedIn = () => {
  return getToken() != null;
}

/**
 * 
 * @param {function to callback when token is removed from local storage} setLoggedIn 
 */
const logout = (setLoggedIn) => {
  localStorage.removeItem("jwtToken");
  setLoggedIn(false);
}

const utils = { fetchAny, login, getToken, loggedIn, logout };
export default utils;