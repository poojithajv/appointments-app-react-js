// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentInput: '',
    dateInput: '',
    appointmentsList: [],
    isStarredBtnClicked: false,
  }

  onChangeAppointmentInput = event => {
    this.setState({
      appointmentInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onSubmitAddButton = event => {
    event.preventDefault()
    const {appointmentInput, dateInput} = this.state
    const newAppointmentItem = {
      appointmentInput,
      dateInput,
      id: uuidv4(),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmentItem],
      appointmentInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarIconBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !prevState.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredBtn = () => {
    this.setState(prevState =>
      prevState.isStarredBtnClicked === false
        ? {isStarredBtnClicked: true}
        : {isStarredBtnClicked: false},
    )
  }

  render() {
    const {
      appointmentInput,
      dateInput,
      appointmentsList,
      isStarredBtnClicked,
    } = this.state

    let displayItems = appointmentsList

    if (isStarredBtnClicked === true) {
      displayItems = appointmentsList.filter(each => each.isStarred === true)
    }

    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-img-container">
            <form className="form-container" onSubmit={this.onSubmitAddButton}>
              <label htmlFor="inputElement" className="label-text">
                TITLE
              </label>
              <input
                onChange={this.onChangeAppointmentInput}
                className="input-text"
                placeholder="Title"
                id="inputElement"
                type="text"
                value={appointmentInput}
              />
              <label htmlFor="dateElement" className="label-text">
                DATE
              </label>
              <input
                onChange={this.onChangeDateInput}
                value={dateInput}
                className="input-text"
                id="dateElement"
                type="date"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointment-container">
            <h1 className="appointment-heading">Appointments</h1>
            <div className="button-container">
              <button
                type="button"
                onClick={this.onClickStarredBtn}
                className="starred-button"
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="list-container">
            {displayItems.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentItemList={eachItem}
                toggleIsStarIconBtn={this.toggleIsStarIconBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
