export function setCookie(name, value, exdays) {
  try {
    localStorage.setItem(name, value);
  } catch (e) {
    setCookie__(name, value, exdays);
  }
}

export function getCookie(cname) {
  try {
    if (localStorage.getItem(cname) === null) {
      return "";
    } else {
      return localStorage.getItem(cname);
    }
  } catch (e) {
    return getCookie__(cname);
  }
}

function setCookie__(name, value, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function removeCookie(key) {
  document.cookie = key + "=;path=/";
}

function getCookie__(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
