import React, { Component } from 'react';

export default class Group extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    members: {},
    isLoading: true,
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/members', { method: 'GET' });
    const members = await response.json();
    this.setState({ members, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <p>加载中</p>;
    }
    const { members } = this.state;
    return (
      <div className="member-list">
        <h1>学员列表</h1>
        {members.map((member, index) => {
          return (
            <div key={index}>
              {member.id}.{member.name}
            </div>
          );
        })}
      </div>
    );
  }
}
