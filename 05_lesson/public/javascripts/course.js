const initForm = () => {
    const form = document.querySelector('#userAccessForm');
    const userField = document.querySelector('#user');
    const hasAccessField = document.querySelector('#hasAccess');

    form.addEventListener('submit', e => e.preventDefault());

    userField.addEventListener('change', ({target: {value}}) => hasAccessField.checked = users.find(user => user.id === Number(value)).hasAccess);

    hasAccessField.addEventListener('change', e => {
        const userId = Number(userField.value);
        const url = `/course/${courseId}/user/${userField.value}`;
        const data = {
            hasAccess: e.target.checked,
        };

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => users.find(({id}) => id === userId).hasAccess = data[userId]);
    });
}

initForm();