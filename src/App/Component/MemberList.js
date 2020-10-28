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

  // TODO GTB-知识点: - 不要在componentDidMount 前面加 async，可以把里面的代码抽成一个async 的方法，然后在componentDidMount里面去调用该方法
  async componentDidMount() {
    // TODO GTB-工程实践: - 建议把URL定义为常量
    const response = await fetch('http://localhost:8080/members', { method: 'GET' });
    const members = await response.json();
    this.setState({ members, isLoading: false });
  }

  handleAddMember = async () => {
    const member = {
      name: this.state.name,
    };
    // TODO GTB-工程实践: - 建议把API请求提取到单独的util，进行一定程度的封装以复用
    await fetch('http://localhost:8080/members', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });
    this.setState({ isOpen: false });
    // TODO GTB-知识点: - 不应该手动调用生命周期函数，前面如果将componentDidMount里面代码提取成一个异步方法就可以直接在这里调用了
    await this.componentDidMount();
  };

  // TODO GTB-知识点: * 这里的field参数没有必要
  handleFieldChange = (field, event) => {
    const { value } = event.target;
    this.setState({
      [field]: value,
    });
  };

  toggleModal = () => {
    // TODO GTB-知识点: - 不能直接修改state!
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
              // TODO GTB-知识点: * 建议将单个学生提取组件，以便在Group里面复用
              <div key={index} className="member">
                {member.id}.{member.name}
              </div>
            );
          })}
          {/* TODO GTB-知识点: - 这里应该直接使用html的button元素  */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className="add-member member" onClick={this.toggleModal}>
            +添加学员
          </div>
        </div>
        {/* TODO GTB-知识点: - 需求是一个input，点击“添加学员”按钮进入编辑模式，触发“Enter”或者blur键创建学员，不需要Modal */}
        {/* TODO GTB-知识点: - onChange每次改动都会触发方法调用，需求不用只用，只用在onBlur或者按enter键触发创建 */}
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
// TODO GTB-工程实践: * 建议把添加学员单独提取组件
