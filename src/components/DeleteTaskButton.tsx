import React from 'react'

import { Intent, Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { DeleteTask, DeleteTaskVariables } from './__generated__/DeleteTask'
import { GetTasks } from './__generated__/GetTasks'
import { GET_TASKS } from './TasksView'

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`

interface DeleteTaskButtonProps {
  className?: string
  disabled?: boolean
  taskId: string
}

function DeleteTaskButton(props: DeleteTaskButtonProps) {
  return (
    <Mutation<DeleteTask, DeleteTaskVariables>
      awaitRefetchQueries
      mutation={DELETE_TASK}
      refetchQueries={[{ query: GET_TASKS }]}
      variables={{ id: props.taskId }}
    >
      {(deleteTask, { loading }) => (
        <Button
          small
          className={props.className}
          disabled={props.disabled}
          loading={loading}
          icon={IconNames.TRASH}
          intent={Intent.DANGER}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation()
            deleteTask()
          }}
        />
      )}
    </Mutation>
  )
}

export default DeleteTaskButton
