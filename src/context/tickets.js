import * as React from 'react';

export default React.createContext({
  tickets: null,
  getTickets: () => { },
  filterStops: null,
  switchFilterStops: () => { },
  ticketsUpdated: null,
  sortBy: null,
  setSort: () => { },
  loading: null
});