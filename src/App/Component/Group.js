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
    this.setState({ groups, isLoading: false, noContent: groups.length === 0 });
  };

  createGroup = async () => {
    const response = await fetch('http://localhost:8080/groups', { method: 'POST' });
    const groups = await response.json();
    this.setState({ groups });
  };

  render() {
    const { groups, isLoading, noContent } = this.state;
    if (isLoading) {
      return <p>加载中</p>;
    }
    if (noContent) {
      return (
        <button type="submit" onClick={() => this.createGroup()}>
          分组学员
        </button>
      );
    }
    return (
      <div className="group-list">
        {' '}
        分组列表
        <button type="submit" onClick={() => this.createGroup()}>
          分组学员
        </button>
        {groups.map((group, index) => {
          return (
            <ul key={index}>
              {' '}
              {index + 1} 组
              {group.map((member, memberIndex) => {
                return (
                  <li key={memberIndex}>
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
