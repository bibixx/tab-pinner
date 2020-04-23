import styled from '@emotion/styled';
import { H2 } from '../Headings';

export const Wrapper = styled.section`
  margin: 1rem -1rem;
  padding: 1rem 0 0;
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 0.5rem;

  ${H2} {
    margin-bottom: 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Td = styled.td`
  height: 3rem;
  padding: 0 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;

  &:first-of-type {
    width: 3rem;
  }

  &:last-child {
    width: 5rem;
    text-align: right;
  }

  tbody tr:last-child & {
    border-bottom: none;
  }
`;

const TdWithTh = Td.withComponent('th');

export const Th = styled(TdWithTh)`
  color: var(--table-header);
  font-size: 0.75rem;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
