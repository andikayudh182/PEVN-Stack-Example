'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    var lecturer = [];
    for (let i = 1; i <11; i++) {
      lecturer.push({
        lecturer_name:`lecture${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
  
      });
    }
    return queryInterface.bulkInsert('Lecturers', lecturer);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
