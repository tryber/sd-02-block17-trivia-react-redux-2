const getEndPointTrivia = (link) => (
  fetch(`https://opentdb.com/${link}`)
    .then((response) => (
      response
        .json()
        .then((json) => (
            response.ok
                ? Promise.resolve(json)
                : Promise.reject(json)))
    ))
);

export default getEndPointTrivia;
