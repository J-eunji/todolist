import { useState, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { dateState } from "../atoms/date";
import { undoneMark } from "../atoms/mark";
import { todoAtomFamily } from "../atoms/todo";

export default function TodoInput() {
  const [todoInput, setTodoInput] = useState([]);
  const [add, setAdd] = useState(false);
  const nextId = useRef(1);
  const date = useRecoilValue(dateState);
  const [todoList, setTodoList] = useRecoilState(todoAtomFamily(date));
  const [undoneMarkList, setUndoneMarkList] = useRecoilState(undoneMark);
  const onClick = () => setAdd(!add);
  const onCreate = (e) => {
    e.preventDefault();
    todoInput.trim() !== "" &&
      setTodoList((todoList) =>
        todoList.concat([{ id: nextId.current, text: todoInput, done: false }])
      );
    nextId.current++;
    setTodoInput("");
    if (todoList.length > 0) if (undoneMarkList.indexOf(date) !== -1) return;
    setUndoneMarkList([...undoneMarkList, date]);
  };

  const onChange = ({ target: { value } }) => {
    setTodoInput(value);
  };

  return (
    <Container>
      <AddBtn onClick={onClick}>{!add ? "+" : "-"}</AddBtn>
      <InputBox add={add} onSubmit={onCreate}>
        <input
          type={"text"}
          onChange={onChange}
          value={todoInput}
          placeholder="할 일을 작성하세요."
        />
        <button>추가</button>
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 30px;
  background-color: none;
  margin-bottom: 20px;
`;
const InputBox = styled.form`
  input {
    width: 300px;
    height: 30px;
    border: none;
    background-color: #fef5ed;
    &:focus {
      outline: none;
      border-bottom: 1px solid #3f1f03;
    }
  }
  button {
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 10px;
    background-color: #e6f0e3;
    cursor: pointer;
    margin-left: 5px;
    &:hover {
      background-color: #c0d8b7;
    }
  }
  ${({ add }) =>
    !add &&
    css`
      display: none;
    `}
`;
const AddBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #e6f0e3;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c0d8b7;
  }
`;
