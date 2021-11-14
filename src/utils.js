import properties from "./properties";
function makeOptions(method, withToken, body) {
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

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function fetchAny(url, callback, method, withToken, body) {
  if (properties.backendURL)
    url = properties.backendURL + url;
  const options = makeOptions(method, withToken, body);
  fetch(url, options)
    .then(res => handleHttpErrors(res))
    .then(data => callback(data))
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => console.log(e.detail))
      }
      else { console.log("Network error"); }
    }
    );
}

const login = (user, password) => {
  const options = makeOptions("POST", true, { username: user, password: password });
  return fetch(properties.backendURL + "login", options)
    .then(handleHttpErrors) 
    .then(res => { setToken(res.token) })
}

//getToken,
//loggedIn,
//login,
//logout,
const setToken = (token) => {
  localStorage.setItem('jwtToken', token)
}

const getToken = () => {
  return localStorage.getItem('jwtToken')
}

const loggedIn = () => {
  return getToken() != null;
}

const logout = () => {
  localStorage.removeItem("jwtToken");
}

const utils = { fetchAny, login, setToken, getToken, loggedIn, logout };
export default utils;