import React, { Component } from 'react';
import base from './config.js'
import './App.css';



class App extends Component {

  constructor() {
    super();
    this.state ={
      userName: '',
      toDo: []
    }
    this.auth = base.auth()
  }

  componentDidMount() {
    base.syncState('toDo', {
         state: 'toDo',
         context: this,
         asArray: true

       })
     }

  addMessage (e) {
    if (e.keyCode === 13) {
    let text = this.input.value.trim()
    let newMessage = { text: text}
    let newMessageArray = this.state.toDo.concat(newMessage)
    this.setState({
      toDo: newMessageArray
    })
    this.input.value = ""
  }
  }
  // this will only delete the first item stored in firebase
  deleteItem(index){
  var newList = this.state.toDo;
  newList.splice(index, 1);
  this.setState({
    toDo: newList
  })
}

  render() {
    return (
      <section className="todoapp">

            <header className="header">
            <h1>todos</h1>
            <input
            onKeyUp={this.addMessage.bind(this)}
            className="new-todo"
            placeholder="What needs to be done?"
            ref={element => this.input = element} autoFocus/>
            </header>

            <section className="main">

            <input className="toggle-all" type="checkbox"/>

            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
            {this.state.toDo.map((todo, index) => {
              return <li key={index}>
              <div className="view">
              <input className="toggle" type='checkbox'/>
              <label>{todo.text}</label>
              <button ref={button => this.button = button}
              onClick={this.deleteItem.bind(this)}
              className="destroy"></button>
              </div>
              <input className="edit" value="Create a TodoMVC template"/>
              </li>
              })
            }
            </ul>
            </section>

            <footer className="footer">
            <span className="todo-count"><strong>0</strong> item left</span>
            <ul className="filters">
              <li>
                <a className="selected" href="#/">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
            </footer>
            </section>
          )
        }
      }

export default App;
