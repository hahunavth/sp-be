'use strict';

/** @type {import('sequelize-cli').Migration} */

function pad(d) {
  return d < 10 ? '0' + d.toString() : d.toString();
}

const dateX = (yyyy, mm, dd) => {
  return `${yyyy}-${pad(mm)}-${pad(dd)} 00:22:01.644 +07:00`;
};

const genSupplier = i => {
  const yyyy = 2021 + Math.floor(i / 20);
  const mm = Math.floor(i % 12) + 1;
  const dd = Math.ceil(Math.random() * 27);
  return {
    id: i,
    name: `NCC ${i}`,
    phone: Math.random().toString().slice(2, 11),
    email: `ncc-${i}-` + 'abcdef-' + Math.random().toString(36).substring(2, 11) + '@random.com',
    address: 'Street A, City B',
    created_at: dateX(yyyy, mm, dd),
    updated_at: dateX(yyyy, mm, dd),
  };
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    for (let i = 0; i < 40; i++) {
      data.push(genSupplier(i));
    }
    return queryInterface.bulkInsert('supplier', data);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('supplier', {});
    // queryInterface.bulkDelete('supplier', {
    //   [Op.or]: [{ name: 'NCC 2' }, { name: 'NCC 1' }],
    // });
  },
};
