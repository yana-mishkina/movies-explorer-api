const mongoose = require('mongoose');
const { url } = require('../regex/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Необходимо указать страну'],
    default: 'No data',
  },
  director: {
    type: String,
    required: [true, 'Необходимо указать режиссера'],
    default: 'No data',
  },
  duration: {
    type: Number,
    required: [true, 'Необходимо указать продолжительность'],
    default: 0,
  },
  year: {
    type: String,
    required: [true, 'Необходимо указать год'],
    default: 'No data',
  },
  description: {
    type: String,
    required: [true, 'Необходимо указать описание'],
    default: 'No data',
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
    default: 'https://beatfilmfestival.ru/',
  },
  trailerLink: {
    type: String,
    required: [true, 'Ссылка не может быть пустой'],
    validate: {
      validator(v) {
        return url.test(v);
      },
      message: 'Ссылка трейлера не корректна',
    },
    default: 'https://beatfilmfestival.ru/',
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
    default: 'https://beatfilmfestival.ru/',
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
    default: 'No data',
  },
  nameEN: {
    type: String,
    required: [true, 'Название на английском может быть пустым'],
    default: 'No data',
  },
});

module.exports = mongoose.model('movie', movieSchema);
