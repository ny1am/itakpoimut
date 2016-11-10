function avatar(picture_url, size) {
	const modifier = size?'-'+size:'';
	return picture_url || `/img/no-user-image${modifier}.png`;
}

export default avatar;