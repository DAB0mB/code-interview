import { zeroTimezone } from '../util';
import Model from './Model';

class ProviderModel extends Model {
  constructor(dataset) {
    for (let d of dataset) {
      d.$name = d.name.toLowerCase();
      d.$specialties = d.specialties.map(s => s.toLowerCase());
      d.$availableDates = d.availableDates.map(d => ({ from: zeroTimezone(d.from), to: zeroTimezone(d.to) }));
    }

    super(dataset);
  }

  async findProviders({ name, specialty, date, minScore } = {}) {
    // TODO: Add validation library
    if (name == null) {
      const err = TypeError('query.name was not provided');
      err.code = 400;

      throw err;
    }

    if (specialty == null) {
      const err = TypeError('query.specialty was not provided');
      err.code = 400;

      throw err;
    }

    if (date == null) {
      const err = TypeError('query.date was not provided');
      err.code = 400;

      throw err;
    }

    if (minScore == null) {
      const err = TypeError('query.minScore was not provided');
      err.code = 400;

      throw err;
    }

    name = String(name).toLowerCase();
    specialty = String(specialty).toLowerCase();
    date = zeroTimezone(Number(date));
    minScore = Number(minScore);

    if (!name) {
      const err = TypeError('query.name cannot be empty');
      err.code = 400;

      throw err;
    }

    if (!specialty) {
      const err = TypeError('query.specialty cannot be empty');
      err.code = 400;

      throw err;
    }

    if (Number.isNaN(date)) {
      const err = TypeError('query.date is not a number');
      err.code = 400;

      throw err;
    }

    if (Number.isNaN(minScore)) {
      const err = TypeError('query.minScore is not a number');
      err.code = 400;

      throw err;
    }

    const providers = this.dataset.filter((provider) => {
      if (name != '*' && provider.$name !== name) return false;
      if (specialty != '*' && !provider.$specialties.includes(specialty)) return false;
      if (provider.score < minScore) return false;

      const isAvailable = provider.$availableDates.some(({ from, to }) => {
        return from <= date && to >= date;
      });

      if (!isAvailable) return false;

      return true;
    });

    return providers.sort((a, b) => a.score > b.score ? -1 : 1);
  }

  async updateProvider({ name, score, specialties } = {}) {
    if (name == null) {
      const err = TypeError('query.name was not provided');
      err.code = 400;

      throw err;
    }

    if (!name) {
      const err = TypeError('query.name cannot be empty');
      err.code = 400;

      throw err;
    }

    if (score == null) {
      const err = TypeError('query.score was not provided');
      err.code = 400;

      throw err;
    }

    if (specialties == null) {
      const err = TypeError('query.specialties was not provided');
      err.code = 400;

      throw err;
    }

    if (!(specialties instanceof Array)) {
      const err = TypeError('query.specialties must be an array');
      err.code = 400;

      throw err;
    }

    score = Number(score);

    if (Number.isNaN(score)) {
      const err = TypeError('query.score is not a number');
      err.code = 400;

      throw err;
    }

    const provider = {
      name,
      $name: name.toLowerCase(),
      score,
      specialties,
      $specialties: specialties.map(s => s.toLowerCase()),
      availableDates: [],
    };

    this.dataset.push(provider);

    return provider;
  }

  async deleteProvider({ name } = {}) {
    if (name == null) {
      const err = TypeError('query.name was not provided');
      err.code = 400;

      throw err;
    }

    name = String(name).toLowerCase();

    if (!name) {
      const err = TypeError('query.name cannot be empty');
      err.code = 400;

      throw err;
    }

    const index = this.dataset.findIndex(p => p.$name === name);

    if (!~index) {
      const err = TypeError('provider not found');
      err.code = 404;

      throw err;
    }

    const provider = this.dataset[index];
    delete this.dataset[index];

    return provider.name;
  }
}

export default ProviderModel;
