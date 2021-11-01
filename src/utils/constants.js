const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Cliente em Potencial',
      leadsIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Dados Confirmados',
      leadsIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Reunião Agendada',
      leadsIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  opportunities: {
    rpa: false,
    digitalProduct: false,
    analytics: false,
    bpm: false,
  },
  statusLead: ['Cliente em Potencial', 'Dados Confirmados', 'Reunião Agendada'],
};

export default initialData;
