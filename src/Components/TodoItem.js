const TodoItem = (props) => {
  const { id, content, isFinish, onFinish, onRemove } = props;
  return (
      <>
          <li>
              <label htmlFor={id} className="todoList_label">
                  <input
                      id={id}
                      className="todoList_input"
                      type="checkbox"
                      checked={isFinish ? 'checked' : ''}
                      value={isFinish ? true : false}
                      onChange={(e) => onFinish(e)}
                  />
                  <span>{content}</span>
              </label>
              <button className="clear_btn_style" id={id} onClick={(e) => onRemove(e)}>
                  <i className="fa fa-times"></i>
              </button>
          </li>
      </>
  );
};

export default TodoItem;