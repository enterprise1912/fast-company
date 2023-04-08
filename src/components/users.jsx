import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDeleteUser = (userID) => {
    setUsers((prevState) =>
      prevState.filter((user) => user._id !== userID._id)
    );
  };

  const renderPhrase = (number) => {
    let renderPhraseClasses = "badge m-2 ";
    renderPhraseClasses += number === 0 ? "bg-danger" : "bg-primary";

    return (
      <h2>
        <span className={renderPhraseClasses}>
          {number === 0
            ? "Никто с тобой не тусанет"
            : number + " человек тусанет с тобой сегодня"}
        </span>
      </h2>
    );
  };

  const renderUsers = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => {
                    return (
                      <span
                        key={quality._id}
                        className={`badge bg-${quality.color} m-1`}
                      >
                        {quality.name}
                      </span>
                    );
                  })}
                </td>
                <td key={user.profession.name}>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {renderPhrase(users.length)}
      {users.length !== 0 && renderUsers()}
    </>
  );
};

export default Users;
