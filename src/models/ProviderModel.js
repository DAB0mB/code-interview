import { zeroTimezone } from '../util';
import Model from './Model';

class ProviderModel extends Model {
  // Simulate async
  async findProviders({ specialty, date, minScore } = {}) {
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

    specialty = String(specialty).toLowerCase();
    date = Number(date);
    minScore = Number(minScore);

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

    // Zero timezone
    date = zeroTimezone(date);

    const providers = this.dataset.filter((provider) => {
      if (provider.score < minScore) return false;
      if (!provider.specialties.map(s => s.toLowerCase()).includes(specialty)) return false;

      const isAvailable = provider.availableDates.some(({ from, to }) => {
        return zeroTimezone(from) <= date && zeroTimezone(to) >= date;
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
