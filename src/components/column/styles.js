import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPaper = styled(Paper)`
  background-color: #eee;
`;

export const Container = styled('div')`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

export const LeadList = styled('div')`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props['data-is-dragging-over'] ? 'skyblue' : '#eee'};
  flex-grow: 1;
  min-height: 100px;
`;
