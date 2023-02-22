// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentItemList, toggleIsStarIconBtn} = props
  const {appointmentInput, dateInput, isStarred, id} = appointmentItemList

  const onClickStarButton = () => {
    toggleIsStarIconBtn(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="star-container">
        <p className="star-heading">{appointmentInput}</p>
        <p className="date">
          Date: {format(new Date(dateInput), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button
        type="button"
        className="button"
        onClick={onClickStarButton}
        data-testid="star"
      >
        <img className="star-image" alt="star" src={imgUrl} />
      </button>
    </li>
  )
}
export default AppointmentItem
