function leadingZero(number) {
	if (number < 10) {
		return '0' + number.toString();
	} else {
		return number.toString();
	}
}

//formats date DD/MM/YYYY
export default function formatDate(dateString) {
	var d = new Date(dateString);
	var dformat = [leadingZero(d.getDate()),
	leadingZero(d.getMonth()+1),
	d.getFullYear()].join('.');
	return dformat;
}