import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AddItemModal({ isOpen, onClose, fieldNames, onSubmit }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = () => {
        console.log("Form Data:", formData);
        onSubmit(formData);
        onClose();
        setFormData({});
    };

    const handleClose = () => {
        onClose();
        setFormData({});
    };

    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Add New Item</DialogHeader>
            <DialogBody divider>
                {fieldNames.map((fieldName) => (
                    <div key={fieldName} className="mb-4">
                        {fieldName === "date" ? (
                            <div>
                                Date: {''}
                                <DatePicker
                                    className="border-2 border-gray-300"
                                    selected={formData[fieldName]}
                                    onChange={(date) => handleDateChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        ) : fieldName === "followUp" ? (
                            <label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Follow Up
                                    <input
                                        style={{ marginLeft: '10px' }}
                                        type="checkbox"
                                        name={fieldName}
                                        checked={formData[fieldName]}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                            </label>
                        ) : (
                            <Input
                                type="text"
                                name={fieldName}
                                label={fieldName}
                                value={formData[fieldName]}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-2"
                >
                    Cancel
                </Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

AddItemModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fieldNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddItemModal;
