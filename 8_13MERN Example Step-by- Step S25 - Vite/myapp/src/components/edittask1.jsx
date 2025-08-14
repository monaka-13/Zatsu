import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default function CreateTask() {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const [activity, setOnChangeActivity] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tasks/${id}`)
      .then((response) => {
        setOnChangeActivity(response.data.activity);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const activityvar = { activity: activity };
    console.log(activityvar);

    console.log(`http://localhost:3000/api/tasks/update/${id}`);
    // console.log(e)

    axios
      .put(`http://localhost:3000/api/tasks/update/${id}`, activityvar)
      .then(() => {
        window.location = '/';
      });
  };

  return (
    <div>
      <Navbar />
      <h3>Create New Task</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Task: </label>
          <input
            type="text"
            required
            className="form-control"
            name="testactivity"
            value={activity}
            onChange={(e) => setOnChangeActivity(e.target.value)}
          />
        </div>
        <br></br>

        <div className="form-group">
          <input
            type="submit"
            value="Update Activity Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
