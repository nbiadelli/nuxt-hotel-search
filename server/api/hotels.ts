import { defineEventHandler, getQuery } from 'h3';
import { filterHotels } from './mockApi';


export default defineEventHandler((event) => {
  const query = getQuery(event);
  return {
    hotels: filterHotels(query)
  };
});