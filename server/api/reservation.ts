import { defineEventHandler, getQuery } from 'h3';
import { makeReservation } from './mockApi';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return {
    booking: makeReservation(query)
  };
});