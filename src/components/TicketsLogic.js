import * as React from 'react';
import TicketsContext from '../context/tickets';

class TicketsLogic extends React.Component {
  state = {
    tickets: [],
    filteredTickets: [],
    filterStops: {
      all: true,
      none: true,
      one: true,
      two: true,
      three: true,
    },
    updateTickets: false,
    ticketsUpdated: false,
    sortBy: 'cheap',
    stopLoading: false
  };

  componentDidUpdate (prevProps, prevState) {
    const { updateTickets, tickets, filterStops, sortBy, ticketsUpdated } = this.state;
    if (updateTickets !== prevState.updateTickets) {
      // setTimeout(() => {
      const filteredTickets = tickets.filter(ticket => {
        return ticket.segments.every(segment => {
          switch (segment.stops.length) {
            case 0:
              return filterStops.all || filterStops.none;
            case 1:
              return filterStops.all || filterStops.one;
            case 2:
              return filterStops.all || filterStops.two;
            case 3:
              return filterStops.all || filterStops.three;
            default:
              return false;
          }
        });
      })
        .sort((a, b) => {
          switch (sortBy) {
            case 'cheap':
              return a.price - b.price;
            case 'fast':
              return a.segments.reduce((val, cur) => (val + cur.duration), 0) - b.segments.reduce((val, cur) => (val + cur.duration), 0);
            default:
              return true;
          }
        });
      this.setState({ filteredTickets, ticketsUpdated: !ticketsUpdated });
      // }, 1000);
    }
  }

  getTickets = async () => {
    const { updateTickets, stopLoading } = this.state;
    if (stopLoading) {
      console.log('stop loading');
      return;
    }
    try {
      const searchIdRes = await fetch('https://front-test.beta.aviasales.ru/search');
      const searchIdObj = await searchIdRes.json();
      const { searchId } = searchIdObj;

      // let stop = false;
      // while (!stop) {
      const ticketsRes = await fetchRetry(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`, null, 4);
      const ticketsObj = await ticketsRes.json();
      // stop = ticketsObj.stop;
      const newTickets = [...this.state.tickets, ...ticketsObj.tickets];
      this.setState({ tickets: newTickets, updateTickets: !updateTickets, stopLoading: ticketsObj.stop });
      // }
      console.log({ stopLoading: ticketsObj.stop });
    } catch (e) {
      console.log(e);
    }
    this.getTickets();
  };

  switchFilterStops = (key) => {
    const { filterStops, updateTickets } = this.state;
    const newFilterStops = { ...filterStops };
    if (key === 'all') {
      const newAll = !newFilterStops.all;
      Object.keys(newFilterStops).forEach(curKey => newFilterStops[curKey] = newAll);
    } else {
      newFilterStops[key] = !newFilterStops[key];
      const { none, one, two, three } = newFilterStops;
      if (none && one && two && three) {
        newFilterStops.all = true;
      } else {
        newFilterStops.all = false;
      }
    }

    this.setState({ filterStops: newFilterStops, updateTickets: !updateTickets });
  };

  setSort = (key) => {
    const { updateTickets } = this.state;
    this.setState({
      sortBy: key,
      updateTickets: !updateTickets
    });
  }

  render () {
    const { filteredTickets, sortBy, filterStops, ticketsUpdated } = this.state;
    const { children } = this.props;
    return (
      <TicketsContext.Provider
        value={ {
          tickets: filteredTickets,
          getTickets: this.getTickets,
          filterStops,
          switchFilterStops: this.switchFilterStops,
          sortBy,
          setSort: this.setSort,
          ticketsUpdated
        } }
      >
        { children }
      </TicketsContext.Provider>
    );
  }
};

const fetchRetry = async (url, options, n) => {
  let error = null;
  for (let i = 0; i < n; i++) {
    try {
      return await fetch(url, options);
    }
    catch (err) {
      error = err;
    }
  }
  throw error;
};

export default TicketsLogic;