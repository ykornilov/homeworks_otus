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

    const titleInput = document.createElement('input');
    titleInput.name = `lessons[${numOfLessons}][title]`;
    titleInput.type = 'text';
    const titleLabel = document.createElement('label');
    titleLabel.className = 'formRow';
    titleLabel.innerText = 'Название занятия';
    titleLabel.appendChild(titleInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.name = `lessons[${numOfLessons}][description]`;
    descriptionInput.type = 'text';
    const descriptionLabel = document.createElement('label');
    descriptionLabel.className = 'formRow';
    descriptionLabel.innerText = 'Описание занятия';
    descriptionLabel.appendChild(descriptionInput);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerText = 'Удалить занятие';
    removeButton.addEventListener('click', () => removeLesson(numOfLessons));
    const removeButtonContainer = document.createElement('div');
    removeButtonContainer.className = 'formActions';
    removeButtonContainer.appendChild(removeButton);

    fieldset.appendChild(titleLabel);
    fieldset.appendChild(descriptionLabel);
    fieldset.appendChild(removeButtonContainer);

    lessons.appendChild(fieldset);
} 
