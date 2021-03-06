import * as React from 'react';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Filter from './components/Filter/Filter';
import Switcher from './components/Switcher/Switcher';
import Ticket from './components/Ticket/Ticket';
import Logo from './components/Logo/Logo';
import Loader from './components/Loader/Loader';

import TicketsContext from './context/tickets';

const AppEl = styled.main`
  background: #F3F7FA;
  /* padding-top: 160px; */
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  div.content {
    margin: auto;
    display: flex;
    align-items: flex-start;
    max-width: 755px;
    height: calc(100vh - 160px);
    width: 100%;
  }
  div.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-self: normal;
    overflow-x: hidden;
  }
  div.tickets {
    overflow-y: scroll;
    height: calc(100vh - 160px - 49px);
    flex: 1;
  }
  @media (max-width: 799px) {
    height: auto;
    div.content {
      flex-direction: column;
      height: 100vh;
      padding: 0 10px;
      box-sizing: border-box;
    }
    div.tickets {
      height: 100vh;
    }
  }
`;

class App extends React.Component {

  static contextType = TicketsContext;

  componentDidMount () {
    this.context.getTickets();
  };

  TicketRender = ({ index, style }) => {
    const { tickets } = this.context;
    // if (index === tickets.length - 1) {
    //   getTickets();
    // }
    return (
      <div style={ style }><Ticket ticket={ tickets[index] } /></div>
    );
  };

  render () {
    const { tickets, ticketsUpdated, loading } = this.context;
    return (
      <AppEl>
        <Logo />
        <div className="content">
          <Filter />
          <div className="main">
            <Switcher />
            { loading && <Loader /> }
            <div className="tickets">
              <AutoSizer className={ ticketsUpdated.toString() }>
                { ({ width, height }) => (
                  <List
                    height={ height }
                    width={ width }
                    itemCount={ tickets.length }
                    itemSize={ 205 }
                    className={ ticketsUpdated.toString() }
                  >
                    { this.TicketRender }
                  </List>
                ) }
              </AutoSizer>
            </div>
          </div>
        </div>
      </AppEl>
    );
  };
};

export default App;
