
## 开发步骤

### 设计Action
### 设计State



### 设计Reduces
### 设计Components

* 组件的拆分
* 组件的预期使用方式

    <!--Todo Demo-->
    <App>
        <AddTodo onAddTodoClick={handleAddTodoClick}/>
        <TodoList todos={this.state.todos} onTodoListClick={handleTodoListClick}/>
        <TodoFooter onTodoFooterClick={handleTodoFooterClick}/>
    </App>

### React和Redux连接

* 注入dispatch、store

## Action

* [官方推荐Action标准写法](https://github.com/acdlite/flux-standard-action)

#### 异步Action


## State

* [Immutable](https://facebook.github.io/immutable-js/) State

    为什么要Immutable？
    State设计 范式结构 https://github.com/gaearon/normalizr

    todos : [
        {
            text : "",
            complete : boolean
        }
    ],
    showFilter : "",
    calValue : Number

##React编译

### Webpack

* https://github.com/petehunt/webpack-howto


##TODO

* 各个部分命名规范化
