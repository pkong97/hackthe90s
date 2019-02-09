const matchAnswers = (answer1, answer2) => {
	if (answer1.length == 0 || answer2.length == 0) {
		return false;
	}
	answer1 = stripAll(answer1);
	answer2 = stripAll(answer2);
	return answer1 == answer2;
}

const stripAll = (s) => {
	return s.replace(/[.,\/#!$%\^&@\*;:{}=\-_`~() ]/g,"").toLowerCase();
}

module.exports = {
	matchAnswers,
	stripAll
}