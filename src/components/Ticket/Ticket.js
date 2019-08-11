import * as React from "react";
import styled from 'styled-components';

const TicketEl = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  &:last-child {
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.h3`
  color: #2196F3;
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
`;

const Key = styled.span`
  color: #A0B0B9;
  text-transform: uppercase;
  display: block;
  font-size: 12px;
`;

const Value = styled.span`
  color: #4A4A4A;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: block;
  font-size: 14px;
`;

const Ticket = ({ ticket }) => {
  return (
    <TicketEl>
      <Header>
        <Price>{ ticket.price.toLocaleString() } Р</Price>
        <img src={ `//pics.avs.io/99/36/${ticket.carrier}.png` } alt="logo" />
      </Header>
      <Content>
        { ticket.segments.map((segment, index) => {
          const date = new Date(segment.date);
          const startTime = new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(date);
          const endTime = new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' })
            .format(date.setMinutes(date.getMinutes() + segment.duration));
          return (
            <React.Fragment key={ `segment${index}` } >
              <div>
                <Key>{ segment.origin } - { segment.destination }</Key>
                <Value>{ startTime } - { endTime }</Value>
              </div>
              <div>
                <Key>в пути</Key>
                <Value>{ Math.trunc(segment.duration / 60) }ч { segment.duration % 60 }м</Value>
              </div>
              <div>
                <Key>{ getLabelByKey(segment.stops.length) }</Key>
                <Value>{ segment.stops.join(', ') }</Value>
              </div>
            </React.Fragment>
          );
        }) }
        {/* <div>
          <Key>MOW - HKT</Key>
          <Value>10:45 - 08:00</Value>
        </div>
          <div>
            <Key>в пути</Key>
            <Value>21ч 15м</Value>
          </div>
          <div>
            <Key>2 пересадки</Key>
            <Value>HKG, JNB</Value>
          </div>
          <div>
            <Key>MOW - HKT</Key>
            <Value>11:20 – 00:50</Value>
          </div>
          <div>
            <Key>в пути</Key>
            <Value>13ч 30м</Value>
          </div>
          <div>
            <Key>1 пересадка</Key>
            <Value>HKG</Value>
        </div> */}
      </Content>
    </TicketEl>
  );
};

const getLabelByKey = (key) => {
  switch (key) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
      return '2 пересадки';
    case 3:
      return '3 пересадки';
    default:
      return;
  }
}

export default Ticket;