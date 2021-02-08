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

  // Simulate async
  async findProviders({ name, specialty, date, minScore } = {}) {
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

    return providers
      .sort((a, b) => a.score > b.score ? -1 : 1)
      .map(p => p.name);
  }
}

export default ProviderModel;
