import React, { Component } from 'react';
import Modal from 'react-modal';
import './MemberList.css';

export default class MemberList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    members: {},
    isLoading: true,
    name: '',
    isOpen: false,
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/members', { method: 'GET' });
    const members = await response.json();
    this.setState({ members, isLoading: false });
  }

  handleAddMember = async () => {
    const member = {
      name: this.state.name,
    };
    await fetch('http://localhost:8080/members', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });
    this.setState({ isOpen: false });
    await this.componentDidMount();
  };

  handleFieldChange = (field, event) => {
    const { value } = event.target;
    this.setState({
      [field]: value,
    });
  };

  toggleModal = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <p>加载中</p>;
    }
    const { members, isOpen } = this.state;
    return (
      <div className="member-page">
        <h1>学员列表</h1>
        <div className="member-list">
          {members.map((member, index) => {
            return (
              <div key={index} className="member">
                {member.id}.{member.name}
              </div>
            );
          })}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className="add-member member" onClick={this.toggleModal}>
            +添加学员
          </div>
        </div>
        <Modal isOpen={isOpen} className="add-modal">
          <input
            type="text"
            className="form-control"
            id="name"
            value={this.state.name}
            placeholder="请输入姓名"
            onChange={(event) => this.handleFieldChange('name', event)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.name === ''}
            onClick={() => {
              this.handleAddMember();
            }}
          >
            Enter
          </button>
        </Modal>
      </div>
    );
  }
}
