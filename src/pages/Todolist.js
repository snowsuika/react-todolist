import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { $http } from 'react';

// mixins
import { hasToken } from '../mixin';

// component
import TodoItem from '../Components/TodoItem';
import AddItem from '../Components/AddItem';
import StatusFilter from '../Components/StatusFilter';
import TodoFooter from '../Components/TodoFooter';
import Header from '../Components/Layout/Header';

const Todolist = () => {
    const navigate = useNavigate();

    // state
    const [newItem, setNewItem] = useState('');
    const [todoItems, setTodoItmes] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(0);
    useEffect(() => {
        if (hasToken) {
            getTodolist();
        } else {
            navigate('/');
        }
    }, []);


    const filterTodoItems = useMemo(() => {
        switch (currentStatus) {
            case 0:
                return todoItems;
            case 1: // 待完成
                return todoItems.filter((item) => !item.completed_at);
            case 2: // 已完成
                return todoItems.filter((item) => item.completed_at);
            default: // 全部
                return todoItems;
        }
    }, [currentStatus, todoItems]);

    const getTodolist = async () => {
        try {
            const response = await $http.getTodoList();
            setTodoItmes(response.todos);
        } catch (error) {
            alert(error);
            navigate('/');
        }
    };
    const onFinish = async (e) => {
        try {
            const { id } = e.currentTarget;
            await $http.toogleDoneTodo(id);
            await getTodolist();
        } catch (error) {
            alert(error);
        }
    };

    const onRemove = async (e) => {
        try {
            const { id } = e.currentTarget;
            await $http.deleteTodo(id);
            await getTodolist();
        } catch (error) {
            alert(error);
        }
    };
    const onRemoveFinishs = async (e) => {
      try {
          const finishItems = todoItems.filter((item) => item.completed_at);
          if (finishItems.length === 0) {
            return;
          }
          for (const item of finishItems) {
            await $http.deleteTodo(item.id);
          }
          await getTodolist();
      } catch (error) {
          alert(error);
      }
  };

    const onAdd = async () => {
        // 驗證
        if (newItem === '') return;

        // init
        setNewItem();
        try {
            await $http.AddTodo({
                todo: {
                    content: newItem,
                },
            });
            await getTodolist();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div id="todoListPage" className="bg-half">
                <Header />
                <div className="conatiner todoListPage vhContainer">
                    <div className="todoList_Content">
                        <AddItem newItem={newItem} setNewItem={setNewItem} onAdd={onAdd} />
                        <div className="todoList_list">
                            <StatusFilter
                                currentStatus={currentStatus}
                                todoItems={todoItems}
                                setTodoItmes={setTodoItmes}
                                setCurrentStatus={setCurrentStatus}
                            />

                            <div className="todoList_items">
                                <ul className="todoList_item">
                                    {filterTodoItems.map((item) => {
                                        const { id, content, completed_at } = item;
                                        return (
                                            <TodoItem
                                                key={id}
                                                id={id}
                                                content={content}
                                                isFinish={completed_at}
                                                onFinish={onFinish}
                                                onRemove={onRemove}
                                            ></TodoItem>
                                        );
                                    })}
                                </ul>
                                <TodoFooter onRemoveFinishs={onRemoveFinishs} todoItems={todoItems} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todolist;
