import React from 'react'

import { ProgressBar, Intent } from '@blueprintjs/core'
import gql from 'graphql-tag'

import { TaskListFragment_tasks } from './__generated__/TaskListFragment'
import TaskListItem from './TaskListItem'

interface TaskListProps {
  loading: boolean
  tasks: TaskListFragment_tasks[]
}

export default class TaskList extends React.Component<TaskListProps> {
  public static defaultProps = {
    loading: false,
  }

  public static fragment = gql`
    fragment TaskListFragment on Query {
      tasks {
        ...TaskItemFragment
      }
    }
    ${TaskListItem.fragment}
  `

  private static determineRatioIntent(ratio: number) {
    if (ratio >= 0.75) return Intent.SUCCESS
    if (ratio >= 0.5) return Intent.WARNING
    return Intent.DANGER
  }

  public render() {
    const { loading, tasks } = this.props

    if (loading) return <ProgressBar animate stripes intent={Intent.NONE} value={1} />

    const ratio = tasks.length !== 0 ? tasks.filter(task => task.done).length / tasks.length : 1

    return (
      <React.Fragment>
        <ProgressBar
          animate={false}
          intent={TaskList.determineRatioIntent(ratio)}
          stripes={false}
          value={ratio}
        />
        <br />
        {tasks.map(task => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </React.Fragment>
    )
  }
}
