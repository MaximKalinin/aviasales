import * as React from 'react';
import styled from 'styled-components';

import TicketsContext from '../../context/tickets';

const FilterEl = styled.div`
  border-radius: 5px;
  background: white;
  /* padding: 20px; */
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-right: 20px;
  color: #4A4A4A;
  h3 {
    font-size: 12px;
    margin: 0;
    padding: 20px;
    padding-bottom: 10px;
    text-transform: uppercase;
    /* padding-bottom: 20px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px; */
  }
  label {
    /* padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px; */
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 13px;
    & > span {
      height: 20px;
      width: 20px;
      border-radius: 2px;
      border: 1px solid #9ABBCE;
      display: inline-block;
      margin-right: 10px;
      position: relative;
    }
    & > input:checked ~ span:after {
      content: '';
      position: absolute;
      width: 30%;
      height: 60%;
      border-bottom: 2px solid #2196F3;
      border-right: 2px solid #2196F3;
      transform: rotate(36deg) translate(5px, -3px);
    }
    & > input:checked ~ span {
      border-color: #2196F3;
    }
  }
  label:last-child {
    padding-bottom: 20px;
  }
  label:hover {
    background: #F1FCFF;
  }
  input {
    visibility: hidden;
    display: none;
  }
`;

const Filter = ({ filterStops, switchFilterStops }) => {
  // const [transfer, setTransfer] = React.useState({ all: false, none: false, one: false, two: false, three: false });
  return (
    <FilterEl>
      <h3>Количество пересадок</h3>
      { Object.keys(filterStops).map(key => {
        const filterOpt = filterStops[key];
        return (
          <label key={ key }>
            <input
              type="checkbox"
              name="transfer"
              id={ key }
              checked={ filterOpt }
              onChange={ () => switchFilterStops(key) }
            />
            <span />
            { getLabelByKey(key) }
          </label>
        );
      }) }
    </FilterEl>
  );
};

const FilterWithContext = () => (
  <TicketsContext.Consumer>
    { ({ filterStops, switchFilterStops }) => (
      <Filter filterStops={ filterStops } switchFilterStops={ switchFilterStops } />
    ) }
  </TicketsContext.Consumer>
);

const getLabelByKey = (key) => {
  switch (key) {
    case 'all':
      return 'Все';
    case 'none':
      return 'Без пересадок';
    case 'one':
      return '1 пересадка';
    case 'two':
      return '2 пересадки';
    case 'three':
      return '3 пересадки';
    default: return;
  }
};

const switchTransfer = (transfer, key, setTransfer) => {
  const newTransfer = { ...transfer };
  newTransfer[key] = !newTransfer[key];
  setTransfer(newTransfer);
  console.log(newTransfer);
};

export default FilterWithContext;