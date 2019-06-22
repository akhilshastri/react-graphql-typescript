import React from 'react'

import { EditableText } from '@blueprintjs/core'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { CreateTask, CreateTaskVariables } from './__generated__/CreateTask'
import { GetTasks } from './__generated__/GetTasks'
import Task from './Task'
import { GET_TASKS } from './TasksView'

const CREATE_TASK = gql`
  mutation CreateTask($message: String!) {
    createTask(message: $message) {
      id
      message
      done
    }
  }
`

const StyledEditableText = styled(EditableText)`
  width: 100%;
`

interface AddTaskState {
  value: string
}

export default class AddTask extends React.Component<{}, AddTaskState> {
  public state: AddTaskState = {
    value: '',
  }

  public render() {
    const { value } = this.state

    return (
      <Mutation<CreateTask, CreateTaskVariables>
        awaitRefetchQueries
        mutation={CREATE_TASK}
        refetchQueries={[{ query: GET_TASKS }]}
        onCompleted={() => this.setState({ value: '' })}
      >
        {(createTask, { loading }) => (
          <Task disabled loading={loading}>
            <StyledEditableText
              disabled={loading}
              placeholder="New Task"
              value={value}
              onChange={value => this.setState({ value })}
              onConfirm={value => {
                if (value !== '') createTask({ variables: { message: value } })
              }}
            />
          </Task>
        )}
      </Mutation>
    )
  }
}
