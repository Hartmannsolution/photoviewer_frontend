import properties from "./properties";

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

const handleHttpErrors = (res) => {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

const fetchAny = (url, callback, method, withToken, body) => {
  if (properties.backendURL)
    url = properties.backendURL + url;
  const options = makeOptions(method, withToken, body);
  fetch(url, options)
    .then(res => handleHttpErrors(res))
    .then(data => callback(data))
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => console.log('ERROR: ',e.message));
      }
      else { console.log("Network error"); }
    }
    );
}

const login = (user, password, setLoggedIn) => {
  return fetchAny(
    properties.cloudURL + "login"
    , res => { setToken(res.token); setLoggedIn(true); }
    , 'POST'
    , true
    ,  { username: user, password: password }
    )
}

const setToken = (token) => {
  localStorage.setItem('jwtToken', token)
}

const getToken = () => {
  return localStorage.getItem('jwtToken')
}

const loggedIn = () => {
  return getToken() != null;
}

const logout = (setLoggedIn) => {
  localStorage.removeItem("jwtToken");
  setLoggedIn(false);
}

const utils = { fetchAny, login, setToken, getToken, loggedIn, logout };
export default utils;