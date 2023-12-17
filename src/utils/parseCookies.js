function parseCookies(cookies) {
  const cookieSplit = cookies.split('; ')
  const dataCookies = cookieSplit.reduce((parsedCookies, cookie) => {
    const [name, value] = cookie.split('=');
    parsedCookies[name] = decodeURIComponent(value);
    return parsedCookies;
  }, {});

  return dataCookies
}

export default parseCookies