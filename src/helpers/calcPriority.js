function calcPriority(easy = 0, medium = 0, hard = 0) {
  let priorityScore = easy * 10 + medium * 5 + hard * 1;
  return priorityScore;
}

export default calcPriority