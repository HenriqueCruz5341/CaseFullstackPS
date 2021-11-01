import { Droppable } from 'react-beautiful-dnd';
import { Lead } from '../lead';
import { LeadList, StyledPaper } from './styles';
import { Grid, Typography } from '@mui/material';

export const Column = ({ column, leads, isDropDisabled }) => {
  return (
    <Grid item xs={4}>
      <StyledPaper elevation={2}>
        <Typography variant="h5" padding={1}>
          {column.title}
        </Typography>
        <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
          {(provided, snapshot) => (
            <LeadList
              ref={provided.innerRef}
              {...provided.droppableProps}
              data-is-dragging-over={snapshot.isDraggingOver}
            >
              {leads.map((lead, index) => (
                <Lead key={lead.id} lead={lead} index={index} />
              ))}
              {provided.placeholder}
            </LeadList>
          )}
        </Droppable>
      </StyledPaper>
    </Grid>
  );
};
