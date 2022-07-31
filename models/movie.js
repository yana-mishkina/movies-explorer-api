const mongoose = require('mongoose');
const { url } = require('../regex/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Необходимо указать страну'],
  },
  director: {
    type: String,
    required: [true, 'Необходимо указать режиссера'],
  },
  duration: {
    type: Number,
    required: [true, 'Необходимо указать продолжительность'],
  },
  year: {
    type: String,
    required: [true, 'Необходимо указать год'],
  },
  description: {
    type: String,
    required: [true, 'Необходимо указать описание'],
  },
  image: {
    type: String,
    required: [true, 'Ссылка не может быть пустой'],
    validate: {
      validator(v) {
        return url.test(v);
      },
      message: 'Ссылка постера не корректна',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Ссылка не может быть пустой'],
    validate: {
      validator(v) {
        return url.test(v);
      },
      message: 'Ссылка трейлера не корректна',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Ссылка не может быть пустой'],
    validate: {
      validator(v) {
        return url.test(v);
      },
      message: 'Ссылка минипостера не корректна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner не может быть пустым'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId не может быть пустым'],
  },
  nameRU: {
    type: String,
    required: [true, 'Название на русском может быть пустым'],
  },
  nameEN: {
    type: String,
    required: [true, 'Название на английском может быть пустым'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
