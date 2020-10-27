import React, { Component } from 'react';

export default class Group extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    groups: [],
    isLoading: true,
    noContent: true,
  };

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8080/groups', { method: 'GET' });
    const groups = await response.json();
    this.setState({ groups, isLoading: false, noContent: groups[0].length === 0 });
  };

  render() {
    const { groups, isLoading, noContent } = this.state;
    if (isLoading) {
      return <p>加载中</p>;
    }
    if (noContent) {
      return <div />;
    }
    return (
      <div className="group-list">
        {groups.forEach((group, index) => {
          return (
            <ul key={index}>
              {group.forEach((member) => {
                return (
                  <li>
                    {member.id}.{member.name}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  }
}
