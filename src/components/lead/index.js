import { Draggable } from 'react-beautiful-dnd';
import { Container } from './styles';

export const Lead = ({ lead, index }) => {
  return (
    <Draggable draggableId={`${lead.id}`} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-is-dragging={snapshot.isDragging}
        >
          {lead.name}
        </Container>
      )}
    </Draggable>
  );
};
