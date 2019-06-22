import React from 'react'

import { Text } from '@blueprintjs/core'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { TaskItemFragment } from './__generated__/TaskItemFragment'
import { UpdateTask, UpdateTaskVariables } from './__generated__/UpdateTask'
import DeleteTaskButton from './DeleteTaskButton'
import Task from './Task'
import { GET_TASKS } from './TasksView'

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $done: Boolean!) {
    updateTask(id: $id, done: $done) {
      id
      done
    }
  }
`

interface TaskListItemProps {
  task: TaskItemFragment
}

export default class TaskListItem extends React.Component<TaskListItemProps> {
  public static fragment = gql`
    fragment TaskItemFragment on Task {
      id
      done
      message
    }
  `

  public render() {
    const { task } = this.props

    return (
      <Mutation<UpdateTask, UpdateTaskVariables>
        awaitRefetchQueries
        mutation={UPDATE_TASK}
        refetchQueries={[{ query: GET_TASKS }]}
        variables={{ id: task.id, done: !task.done }}
      >
        {(updateTask, { loading }) => (
          <Task
            checked={task.done}
            actions={<DeleteTaskButton taskId={task.id} />}
            loading={loading}
            onCheck={() => updateTask()}
          >
            <Text>{task.message}</Text>
          </Task>
        )}
      </Mutation>
    )
  }
}
