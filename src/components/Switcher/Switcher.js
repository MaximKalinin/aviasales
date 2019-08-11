import * as React from 'react';
import styled from 'styled-components';

import TicketsContext from '../../context/tickets';

const SwitcherEl = styled.nav`
  display: flex;
  width: 100%;
  h3:first-of-type {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  h3:last-of-type {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  h3 {
    font-size: 12px;
    text-align: center;
    color: #4A4A4A;
    margin: 0;
    flex: 1;
    padding: 15px;
    background: white;
    border: 1px solid #DFE5EC;
    text-transform: uppercase;
    cursor: pointer;
  }
  h3.active {
    background: #2196F3;
    color: white;
    border: none;
  }
`;

const Switcher = ({ sortBy, setSort }) => {
  const tabs = ['cheap', 'fast'];
  return (
    <SwitcherEl>
      { tabs.map(tab => (
        <h3
          key={ tab }
          className={ sortBy === tab && 'active' || '' }
          onClick={ () => setSort(tab) }
        >
          { getLabelByKey(tab) }
        </h3>
      )) }
    </SwitcherEl>
  );
};

const SwitcherWithContext = () => (
  <TicketsContext.Consumer>{ ({ sortBy, setSort }) => (
    <Switcher sortBy={ sortBy } setSort={ setSort } />
  ) }</TicketsContext.Consumer>
);

const getLabelByKey = (key) => {
  switch (key) {
    case 'cheap':
      return 'Самый дешевый';
    case 'fast':
      return 'Самый быстрый';
    default:
      return;
  }
};

export default SwitcherWithContext;