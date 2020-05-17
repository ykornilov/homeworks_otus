const getCourseAccess = (course, userId) => {
    const isOwner = String(course.owner) === userId;
    const hasAccess = isOwner || course.users.some(id => String(id) === userId);

    return {isOwner, hasAccess};
}

module.exports = {
    getCourseAccess,
};
