import { connect } from 'react-redux';
import App from '../App';

import { fetchEntries, changeWeek } from 'ducks/entry';
import { fetchEmployees } from 'ducks/employees';
import { fetchProjects } from 'ducks/projects';
import { fetchEmployeeProjects } from 'ducks/employeeProjects';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

export default compose(
  withRouter,
  connect(state => ({
      entries: state.entry.entries,
      d: state.entry.d,
      loading: state.entry.loading,
      employees: state.employees,
      projects: state.projects,
      employeeProjects: state.employeeProjects
    }),
    {
      fetchEntries,
      changeWeek,
      fetchEmployees,
      fetchProjects,
      fetchEmployeeProjects
    }
  )
)(App);
