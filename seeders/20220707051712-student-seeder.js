'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    var student = [];
    for (let i = 1; i <11; i++) {
      student.push({
        
        student_name:`studentnew${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
  
      });
    }
    return queryInterface.bulkInsert('Students', student);
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
