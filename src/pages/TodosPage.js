import React, { Component } from 'react';
import TodoApp from 'components/TodoApp';
import { connect } from 'react-redux';

class TodosPage extends Component {
  render() {
    return (
      <div>
        <h1>Aqui no entra nunca</h1>
        <TodoApp />
      </div>
    );
  }
}


const mapStateToProps = function mapStateToProps(state) {
  return { todos: state.todos, filter: state.filter };
};
export default connect(mapStateToProps, todosActionCreators)(TodosPage);
