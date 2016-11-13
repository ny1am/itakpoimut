function http(url) {
	//todo revise this hotfix
	if (url.indexOf('http') === 0) {
		return url;
	} else {
		return 'http://'+url;
	}
}

export default http;