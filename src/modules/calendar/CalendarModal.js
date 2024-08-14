import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../../actions/ui";
import {
  setActive,
  startAddNewEvent,
  startUpdateEvent,
} from "../../actions/calendar";
import { DialogUI } from "../../components/ui/DialogUI";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { CustomizedAutoComplete } from "../../components/ui/CustomizedAutoComplete";

Modal.setAppElement("#root");
const startDate = dayjs().minute(0).second(0).add(1, "hour");
const endDate = startDate.clone().add(1, "hours");
const initEvent = {
  title: "",
  notes: "",
  start: startDate,
  end: endDate,
  users:[]
};
export const CalendarModal = () => {
  const [formValues, setFormValues] = useState(initEvent);
  const [usersEvent, setUsersEvent] = useState([])

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent, usersActive } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeEvent) {
      const startActive = dayjs(activeEvent.start);
      const endActive = dayjs(activeEvent.end);
      setFormValues({
        ...activeEvent,
        start: startActive,
        end: endActive
      });
      setUsersEvent(activeEvent.users)
    } else {
      setFormValues(initEvent);
      setUsersEvent([])
    }
  }, [activeEvent, setFormValues]);

  const { title, notes, start, end } = formValues;
  const closeModal = () => {
    dispatch(handleModal(false));
    dispatch(setActive(null));
    setFormValues(initEvent);
  };

  const handdleInputChange = (e, nameDateField) => {
    const { target } = e;
    
    if (target) {
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
    } else {
      setFormValues({
        ...formValues,
        [nameDateField]: e,
      });
    }
  };

  const handleUserChange = (newUsers) => {
    setUsersEvent(newUsers)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formValues,
      users: [
        ...usersEvent,
        {
          user:uid
        }
      ]
    }
    if (!activeEvent) {
      dispatch(
        startAddNewEvent(dataToSave)
      );
    } else {
      dispatch(startUpdateEvent(activeEvent.id, dataToSave));
    }
    closeModal();
  };
  return (
    <DialogUI
      open={modalOpen}
      handleClose={closeModal}
      handleSubmit={handleSubmitForm}
      title={"Nuevo evento"}
    >
        <div className="event-modal">
            <div className="event-modal-section">
                
                <DateTimePicker
                className="event-form-field"
                label="Fecha y hora inicio"
                viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                }}
                value={start}
                onChange={(e)=> handdleInputChange(e,'start')}
                />
                <DateTimePicker
                className="event-form-field"
                label="Fecha y hora fin"
                viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                }}
                value={end}
                onChange={(e)=> handdleInputChange(e,'end')}
                />
            </div>
            <div className="event-modal-section">
                <TextField
                className="event-form-field"
                label="Titulo del evento"
                variant="outlined" 
                name="title"
                value={title}
                onChange={handdleInputChange}
                size="small"
                />
                <TextField
                    className="event-form-field"
                    label="Notas adicionales"
                    variant="outlined" 
                    size="small"
                    multiline
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handdleInputChange}
                />
            </div>
            <CustomizedAutoComplete options={usersActive} currentOptions={usersEvent} onCurrentOptionsChange={handleUserChange}/>
        </div>
    </DialogUI>
  );
};
