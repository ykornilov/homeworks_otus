const removeLesson = lessonId => {
    const lessons = document.querySelector(`#lessons`);
    const lesson = lessons.querySelector(`#lesson-${lessonId}`);

    lessons.removeChild(lesson)
}

const addLesson = () => {
    const lessons = document.querySelector('#lessons');
    const numOfLessons = lessons.querySelectorAll('fieldset').length;

    const fieldset = document.createElement('fieldset');
    fieldset.id = `lesson-${numOfLessons}`;

    const titleContainer = document.createElement('div');
    titleContainer.className='form-group';
    const titleInput = document.createElement('input');
    titleInput.name = `lessons[${numOfLessons}][title]`;
    titleInput.id = `lessons[${numOfLessons}][title]`;
    titleInput.type = 'text';
    titleInput.className = 'form-control';
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', `lessons[${numOfLessons}][title]`);
    titleLabel.innerText = 'Название занятия';
    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.className='form-group';
    const descriptionInput = document.createElement('input');
    descriptionInput.name = `lessons[${numOfLessons}][description]`;
    descriptionInput.id = `lessons[${numOfLessons}][description]`;
    descriptionInput.type = 'text';
    descriptionInput.className = 'form-control';
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', `lessons[${numOfLessons}][description]`);
    descriptionLabel.innerText = 'Описание занятия';
    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className='btn btn-secondary';
    removeButton.innerText = 'Удалить занятие';
    removeButton.addEventListener('click', () => removeLesson(numOfLessons));
    const removeButtonContainer = document.createElement('div');
    removeButtonContainer.className = 'formActions';
    removeButtonContainer.appendChild(removeButton);

    fieldset.appendChild(titleContainer);
    fieldset.appendChild(descriptionContainer);
    fieldset.appendChild(removeButtonContainer);

    lessons.appendChild(fieldset);
} 
