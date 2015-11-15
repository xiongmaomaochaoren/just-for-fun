
### 开发步骤

#### 设计Action
#### 设计State
#### 设计Reduces
#### 设计Components

* 组件的拆分
* 组件的预期使用方式

    <!--Todo Demo-->
    <App>
        <AddTodo onAddTodoClick={handleAddTodoClick}/>
        <TodoList todos={this.state.todos} onTodoListClick={handleTodoListClick}/>
        <TodoFooter onTodoFooterClick={handleTodoFooterClick}/>
    </App>

#### React和Redux连接

### Action

* [官方推荐Action标准写法](https://github.com/acdlite/flux-standard-action)


### State数据结构

    todos : [
        {
            text : "",
            complete : boolean
        }
    ],
    showFilter : ""
