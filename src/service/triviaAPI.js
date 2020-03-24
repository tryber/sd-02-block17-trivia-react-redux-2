const getEndPointTrivia = () => (
  fetch('https://opentdb.com/api.php?amount=5')
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
