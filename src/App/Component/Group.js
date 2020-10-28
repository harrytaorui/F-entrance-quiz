import React, { Component } from 'react';
import './Group.css';

export default class Group extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    groups: [],
    isLoading: true,
    noContent: true,
  };

  // TODO: 同 MemberList.js 里面
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
    // TODO GTB-知识点: + 正确使用ES6+语法解构
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
        <h1>分组列表</h1>
        <button type="submit" onClick={() => this.createGroup()}>
          分组学员
        </button>
        {groups.map((group, index) => {
          return (
            <ul key={index} className="group">
              {/* TODO GTB-知识点: - 组名应由后台自动生成 */}
              <p>{index + 1} 组</p>
              <div className="group-member">
                {group.map((member, memberIndex) => {
                  return (
                    // TODO GTB-知识点: * 这里单个学生最后提取组件，和MemberList里面保持一致
                    <li key={memberIndex} className="member">
                      {member.id}.{member.name}
                    </li>
                  );
                })}
              </div>
            </ul>
          );
        })}
      </div>
    );
  }
}
