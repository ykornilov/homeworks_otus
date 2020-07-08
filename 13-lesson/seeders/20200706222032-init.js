'use strict';

module.exports = {
  up: async (queryInterface) => {
      await queryInterface.bulkInsert('navigations', [
        {
          name: 'Курсы',
          url: '/courses',
          icon: 'courses.png',
        },
        {
          name: 'Пользователи',
          url: '/users',
          icon: 'users.png',
        },
        {
          name: 'Настройки',
          url: '/settings',
          icon: 'settings.png',
        },
      ], {});
      await queryInterface.bulkInsert('users', [
        {
          username: 'user1',
          password: 'pass1',
        },
        {
          username: 'user2',
          password: 'pass2',
        },
      ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('navigations', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
