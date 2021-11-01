import { styled } from '@mui/system';

export const Container = styled('div')`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props['data-is-dragging'] ? 'lightgreen' : 'white'};
`;
