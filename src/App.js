import React, { useState, useRef } from 'react';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';
import Styles from './css/style.module.css';
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';

/**
 * アプリケーション
 */
function App() {

  var [tasks, setTasks] = useState([]);
  var taskNameRef = useRef();
  var [comp, setComp] = useState(false);

  /**
   * タスクを追加を押下
   */
  var clickAddTask = () => {

    var name = taskNameRef.current.value.trim();

    if (name === "") return;

    setTasks((prevTasks) => {
      return [...prevTasks, {
        id: uuidv4(),
        name: name,
        taskClassName: Styles.unCompleted,
        displayStateClassName: Styles.display,
        checked: false
      }];
    });

    taskNameRef.current.value = null;
  };

  /**
   * タスクのチェック確認
   * @param {*主キー} id 
   */
  var toggleTask = (id) => {

    var newTasks = [...tasks];
    var task = newTasks.find((task) => task.id === id)
    task.checked = !task.checked;
    task.taskClassName = SwitcClassNameByTaskState(task.taskClassName);
    task.displayStateClassName = SwicthClassNameByDisplayState(task.displayStateClassName);
    setTasks(newTasks);
  };

  /**
   * 完了したタスクの削除を押下
   */
  var clickDropTask = () => {
    var newTasks = tasks.filter((task) => !task.checked);
    setTasks(newTasks);
  }

  /**
   * テキストボックスフォーカス中にエンターキーを押下
   * @param e 
   */
  var pressEnter = (e) => {
    if (e.key == 'Enter') {
      return clickAddTask();
    }
  }

  /**
   * 未完了または完了済みボタン押下
   * @param e 
   */
  var clickCompletedOrUncompleted = (e) => {

    var btnValue = e.target.attributes.value.nodeValue;
    var newTasks = [...tasks];

    newTasks.forEach(element => {
      toggleDisplay(element, btnValue);
    });

    setTasks(newTasks);

    switch (btnValue) {
      case 'completed':
        setComp(true);
        break;

      case 'unCompleted':
        setComp(false);
        break;
    }
  }

  return (
    <div className={Styles.App}>
      <div className={Styles.inputWrap}>
        <input type="text" ref={taskNameRef} onKeyPress={pressEnter} />
        <button onClick={clickAddTask} className={Styles.addButton}>
          タスクを追加
        </button>
        <button onClick={clickDropTask} className={Styles.dropButton}>
          完了したタスクの削除
        </button>
      </div>
      <div className={Styles.taskInfo}>
        <p className={Styles.remainingTasks}>
          残りタスク：{tasks.filter((task) => !task.checked).length}
        </p>
        <div>
          <button
            onClick={clickCompletedOrUncompleted}
            value="unCompleted"
            className={!comp ? Styles.clicked : Styles.unClicked}>
            未完了
          </button>
          <button
            onClick={clickCompletedOrUncompleted}
            value="completed"
            className={comp ? Styles.clicked : Styles.unClicked}>
            完了済み
          </button>
        </div>
      </div>
      <div>
        <TaskList tasks={tasks} toggleTask={toggleTask} />
      </div>
    </div >
  );
};

/**
 * ==================================================
 * メソッド定義
 * ==================================================
 */

/**
 * 受け取ったクラス名によってクラス名を切り替える
 * @param {string} className クラス名
 * @returns {string} 実行後クラス名
 */
function SwitcClassNameByTaskState(taskState) {

  switch (taskState) {
    case Styles.unCompleted:
      return Styles.completed

    case Styles.completed:
      return Styles.unCompleted

    default:
      return Styles.unCompleted
  }
}

/**
 * 受け取った表示状態によってクラス名を切り替え
 * @param {string} displayState クラス名 
 * @returns {string} 実行後クラス名
 */
function SwicthClassNameByDisplayState(displayState) {

  switch (displayState) {
    case Styles.display:
      return Styles.notDisplay

    case Styles.completed:
      return Styles.notDisplay

    default:
      return Styles.display
  }
}

/**
 * 表示切替
 * @param {task} task タスク
 * @param {e} e イベント
 */
function toggleDisplay(task, btnValue) {
  switch (btnValue) {
    case 'completed':
      switch (task.taskClassName) {
        case Styles.completed:
          task.displayStateClassName = Styles.display;
          break;

        case Styles.unCompleted:
          task.displayStateClassName = Styles.notDisplay;
          break;
      }
      break;

    case 'unCompleted':
      switch (task.taskClassName) {
        case Styles.completed:
          task.displayStateClassName = Styles.notDisplay;
          break;

        case Styles.unCompleted:
          task.displayStateClassName = Styles.display;
          break;
      }
  }
}

export default App;