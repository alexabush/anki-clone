function createCard(
  id,
  question,
  answer,
  easy = 0,
  medium = 0,
  hard = 0,
  priority = 0
) {
  return {
    id,
    question,
    answer,
    priority,
    easy,
    medium,
    hard
  };
}

export default createCard;