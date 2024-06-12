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

export function AddPetModal({ isOpen, onClose, fieldNames, onSubmit }) {
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
            <DialogHeader>Add Pet</DialogHeader>
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

AddPetModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fieldNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddPetModal;
