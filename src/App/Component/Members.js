import React, { Component } from 'react';
import MemberList from './MemberList';
import Group from './Group';

export default class Members extends Component {
  render() {
    return (
      <div className="member-page">
        <Group />
        <MemberList />
      </div>
    );
  }
}
