import { Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useHistory } from 'react-router';
import { Column } from '../../components/column';
import initialData from '../../utils/constants';

const Leads = () => {
  const history = useHistory();
  const [leads, setLeads] = useState([]);
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(true);
  const [homeIndex, setHomeIndex] = useState();

  useEffect(() => {
    const loadLeads = JSON.parse(window.localStorage.getItem('leads') || '[]');
    setLeads(loadLeads);
  }, []);

  useEffect(() => {
    if (leads.length > 0) {
      let segmentedLeads = [];

      leads.forEach((lead) => {
        const destination = initialData.statusLead.indexOf(lead.status);
        if (!segmentedLeads[destination]) segmentedLeads[destination] = [];
        segmentedLeads[destination].push(`${lead.id}`);
      });

      const newColumns =
        JSON.parse(window.localStorage.getItem('columns')) ||
        initialData.columns;

      const haveNewLead =
        segmentedLeads[0] &&
        segmentedLeads[0].length >
          newColumns[initialData.columnOrder[0]].leadsIds.length;

      if (newColumns === initialData.columns || haveNewLead) {
        let i = 0;
        for (const column in newColumns) {
          newColumns[column].leadsIds = segmentedLeads[i]
            ? [...segmentedLeads[i]]
            : [];
          i++;
        }
      }

      handleUpdateColumns(newColumns);

      setLoading(false);
    }
  }, [leads]);

  const handleUpdateLeads = (status, leadId) => {
    setLeads((leads) => {
      const index = leads.findIndex((lead) => lead.id === +leadId);
      if (index !== -1) leads[index].status = status;

      window.localStorage.setItem('leads', JSON.stringify(leads));
      return leads;
    });
  };

  const handleUpdateColumns = (newColumns) => {
    setColumns((columns) => {
      columns = { ...columns, ...newColumns };

      window.localStorage.setItem('columns', JSON.stringify(columns));
      return columns;
    });
  };

  const onDragStart = (start) => {
    const newHomeIndex = initialData.columnOrder.indexOf(
      start.source.droppableId
    );

    setHomeIndex(newHomeIndex);
  };

  const onDragEnd = (result) => {
    setHomeIndex(null);

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newLeadsIds = [...start.leadsIds];
      newLeadsIds.splice(source.index, 1);
      newLeadsIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        leadsIds: newLeadsIds,
      };

      handleUpdateColumns({ [newColumn.id]: newColumn });
      return;
    }

    // Moving from one list to another
    const startLeadIds = [...start.leadsIds];
    startLeadIds.splice(source.index, 1);
    const newStart = {
      ...start,
      leadsIds: startLeadIds,
    };

    const finishTaskIds = [...finish.leadsIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      leadsIds: finishTaskIds,
    };

    handleUpdateColumns({ [newStart.id]: newStart, [newFinish.id]: newFinish });
    handleUpdateLeads(newFinish.title, draggableId);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Leads</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => history.push('/newLead')}>
            Novo Lead (+)
          </Button>
        </Grid>
        {!loading && (
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Grid container spacing={2} item xs={12}>
              {initialData.columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                const auxLeads = column.leadsIds.map(
                  (leadId) => leads.filter((lead) => lead.id === +leadId)[0]
                );

                const isDropDisabled =
                  homeIndex > index || index > homeIndex + 1;

                return (
                  <Column
                    key={column.id}
                    column={column}
                    leads={auxLeads}
                    isDropDisabled={isDropDisabled}
                  />
                );
              })}
            </Grid>
          </DragDropContext>
        )}
      </Grid>
    </Container>
  );
};

export default Leads;
