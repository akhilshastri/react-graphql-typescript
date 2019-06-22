import React from 'react'

import { H1 } from '@blueprintjs/core'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { GetTasks } from './__generated__/GetTasks'
import AddTask from './AddTask'
import TaskList from './TaskList'

export const GET_TASKS = gql`
  query GetTasks {
    ...TaskListFragment
  }
  ${TaskList.fragment}
`

interface TasksViewProps {
  className?: string
}

function TasksView(props: TasksViewProps) {
  return (
    <div className={props.className}>
      <H1>⏰ MY TASKS</H1>
      <Query<GetTasks> query={GET_TASKS} pollInterval={10000}>
        {({ data, loading, error, subscribeToMore }) => {
          if (error) return error.message

          const tasks = !loading && data ? data.tasks : []

          return (
            <React.Fragment>
              <TaskList loading={loading} tasks={tasks} />
              {!loading && <AddTask />}
            </React.Fragment>
          )
        }}
      </Query>
    </div>
  )
}

export default TasksView
