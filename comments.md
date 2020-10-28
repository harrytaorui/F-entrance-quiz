### 完成度：

**Details:**

### 测试：

**Details:**

### 知识点：

- 这里的 field 参数没有必要
- 建议将单个学生提取组件，以便在 Group 里面复用
- 这里单个学生最后提取组件，和 MemberList 里面保持一致

**Details:**

- \+ 正确使用 ES6+语法解构

* \- 不要在 componentDidMount 前面加 async，可以把里面的代码抽成一个 async 的方法，然后在 componentDidMount 里面去调用该方法
* \- 不应该手动调用生命周期函数，前面如果将 componentDidMount 里面代码提取成一个异步方法就可以直接在这里调用了
* \- 不能直接修改 state!
* \- 这里应该直接使用 html 的 button 元素
* \- 需求是一个 input，点击“添加学员”按钮进入编辑模式，触发“Enter”或者 blur 键创建学员，不需要 Modal
* \- onChange 每次改动都会触发方法调用，需求不用只用，只用在 onBlur 或者按 enter 键触发创建
* \- 组名应由后台自动生成

### 工程实践：

- 建议把添加学员单独提取组件

**Details:**

- \- 建议把 URL 定义为常量
- \- 建议把 API 请求提取到单独的 util，进行一定程度的封装以复用

### 综合：

**Details:**
