function roleAdmin(user) {
	return user && user.roles.indexOf('admin') !== -1;
}

export default roleAdmin;