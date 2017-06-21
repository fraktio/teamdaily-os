import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Icon } from 'react-fa';
import keydown from 'react-keydown';

import styles from './style.pcss';
import menuStyles from './menuStyle.pcss';
import modalStyles from './modalStyle.pcss';

export default class EmployeeModal extends React.Component {
    state = { color: null }

    selectColor = (color) => this.setState({color: color});
    handleCloseClick = () => this.props.handleClose();

    componentWillMount() {
        const lastEntry = this.props.e.entry.size > 0 ? this.props.e.entry.get(-1) : null;
        if (lastEntry) {
            this.selectColor(lastEntry.color);
        }
    }

    @keydown(27)
    closeModal(event) {
        event.preventDefault();
        this.props.handleClose();
    }
    @keydown(40)
    next(event) {
        event.preventDefault();
        const ordered = this.props.orderedEmployees.toJS();
        const index = ordered.findIndex(emp => emp.id === this.props.e.id);

        if (!ordered[index + 1]) {
            return
        }

        const nextEmployee = ordered[index + 1];
        this.props.handleSelectEmployee(nextEmployee);
    }
    @keydown(38)
    prev(event) {
        event.preventDefault();
        const ordered = this.props.orderedEmployees.toJS();
        const index = ordered.findIndex(emp => emp.id === this.props.e.id);

        if (!ordered[index - 1]) {
            return
        }

        const prevEmployee = ordered[index - 1];
        this.props.handleSelectEmployee(prevEmployee);
    }

    render() {
        const { e, handleClose, projects, sortedEmployees, handleSelectEmployee } = this.props;

        if (!e) { return null; }

        const lastEntry = e.entry.size > 0 ? e.entry.get(-1) : null;
        const color = lastEntry ? lastEntry.color : "empty";

        const selectedColor = this.state.color;

        return (
            <div>
                <div className={menuStyles.menu}>
                    <div className={menuStyles.header}>
                    </div>
                    {
                        sortedEmployees.attention.map(em => {

                            const isSelected = em.id === e.id;
                            const menuColor = `menu-${getColor(em)}`

                            return (
                                <div
                                    className={`${menuStyles.employee} ${isSelected ? menuStyles.selected : ''} ${menuColor}`}
                                    key={em.id}
                                    onClick={() => handleSelectEmployee(em)}>
                                    {em.name}
                                    {em.flagged &&  <Icon className={styles.flaggedIcon} name="commenting-o" />}
                                </div>
                            )
                        })
                    }
                    {
                        sortedEmployees.green.map(em => {
                            console.log(em)
                            const isSelected = em.id === e.id;
                            const menuColor = `menu-${getColor(em)}`
                            return (
                                <div
                                    className={`${menuStyles.employee} ${isSelected ? menuStyles.selected : ''} ${menuColor}`}
                                    key={em.id}
                                    onClick={() => handleSelectEmployee(em)}>
                                    {em.name}
                                    {em.flagged &&  <Icon className={styles.flaggedIcon} name="commenting-o" />}
                                </div>
                            )
                        })
                    }
                    {
                        sortedEmployees.withoutEntry.map(em => {
                            console.log(em)
                            const isSelected = em.id === e.id;
                            return (
                                <div
                                    className={`${menuStyles.employee} ${isSelected ? menuStyles.selected : ''}`}
                                    key={em.id}
                                    onClick={() => handleSelectEmployee(em)}>
                                    {em.name}
                                    {em.flagged &&  <Icon className={styles.flaggedIcon} name="commenting-o" />}
                                </div>
                            )
                        })
                    }
                </div>
            <ModalContainer>
            <ModalDialog>
                <button className={modalStyles.closeButton} onClick={this.handleCloseClick}>X</button>
                <div className={`${modalStyles.header} ${color}`}>
                    <h4 className={modalStyles.title}>{e.name}</h4>
                </div>
                {lastEntry &&
                    <div className={modalStyles.message}>
                        {lastEntry.message}
                    </div>
                }
                <div className={modalStyles.content}>
                    Fiilismittari:
                    <div className={modalStyles.moods}>
                        {MoodsList.map(m => {
                            const isActive = color === m.color ? true : false;
                            //onClick={() => this.selectColor(m.color)}
                            return (
                                <div
                                    className={`${modalStyles.mood} ${isActive ? modalStyles.activeMood : ''}`}
                                    key={m.color}>
                                    {m.icon}
                                    <p className={m.color}>{m.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    Mitkä projektit odottavat panostasi?
                    <div className={modalStyles.projects}>
                        {e.employeeProjects &&
                        e.employeeProjects.map(p => <button className={styles.project} key={p.id}>{p.name}</button>)}
                    </div>
                </div>
            </ModalDialog>
            </ModalContainer>
            </div>
        )
    }
}

const MoodsList = [
    {
        color: 'blue',
        text: 'Ei tekemistä',
        icon: '😪',
    },
    {
        color: 'green',
        text: 'Sopiva',
        icon: '😁',
    },
        {
        color: 'yellow',
        text: 'Kiirettä',
        icon: '😕',
    },
        {
        color: 'red',
        text: 'Overload!!',
        icon: '😵',
    },
]

function getColor(e) {
    const lastEntry = e.entry.size > 0 ? e.entry.get(-1) : null;
    return lastEntry ? lastEntry.color : "empty";
}
