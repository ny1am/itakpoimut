function roleModerator(user) {
	return user && user.roles.indexOf('moderator') !== -1;
}

export default roleModerator;