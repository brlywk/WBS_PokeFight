export function getLeaderboard(req, res, next) {
  res.status(200).send("Leaderboard requested");
}

export function postNewFight(req, res, next) {
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw new Error('No body found in "postNewFight" request.');
  }

  res.status(200).send(`Fight data received: ${JSON.stringify(body)}`);
}
