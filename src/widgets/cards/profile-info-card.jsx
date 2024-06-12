import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useState } from "react";

export function ProfileInfoCard({
    title,
    description,
    details,
    setDetails,
    action,
    editable,
    onSave,
}) {
    const handleSave = () => {
        if (onSave) {
            onSave(details);
            window.location.reload();
        }
    };

    const handleAddMedicine = () => {
        setDetails((prev) => ({
            ...prev,
            medicine: [...(prev.medicine || []), ""],
        }));
    };

    const handleMedicineChange = (index, value) => {
        setDetails((prev) => {
            const updatedMedicine = [...prev.medicine];
            updatedMedicine[index] = value;
            return { ...prev, medicine: updatedMedicine };
        });
    };

    const handleStatusChange = (value) => {
        setDetails((prev) => ({
            ...prev,
            status: value,
        }));
    };

    const renderEditableField = (el, value) => {
        if (el === "status") {
            return (
                <select
                    onChange={(e) => handleStatusChange(e.target.value)}
                    value={value}
                    className="border border-blue-gray-200 p-1 rounded-md"
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                </select>
            );
        } else if (el.toLowerCase().includes("date") || el.toLowerCase().includes("createdat")) {
            return (
                <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                >
                    {new Date(value).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'UTC'
                    })} UTC
                </Typography>
            );
        } else if (el === "medicine") {
            return (
                <div className="flex flex-col gap-2">
                    {(details.medicine || []).map((med, index) => (
                        <input
                            key={index}
                            type="text"
                            onChange={(e) => handleMedicineChange(index, e.target.value)}
                            value={med}
                            placeholder="Enter value"
                            className="border border-blue-gray-200 p-1 rounded-md"
                        />
                    ))}
                    <Button
                        onClick={handleAddMedicine}
                        className="mt-2"
                    >
                        + Add Medicine
                    </Button>
                </div>
            );
        } else {
            return (
                <input
                    type="text"
                    onChange={(e) => {
                        setDetails((prev) => ({
                            ...prev,
                            [el]: e.target.value,
                        }));
                    }}
                    value={value === "N/A" ? "" : value}
                    placeholder="Enter value"
                    className="border border-blue-gray-200 p-1 rounded-md"
                />
            );
        }
    };

    return (
        <Card color="transparent" shadow={false}>
            <CardHeader
                color="transparent"
                shadow={false}
                floated={false}
                className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
            >
                <Typography variant="h5" color="blue-gray">
                    {title}
                </Typography>
                {action}
            </CardHeader>
            <CardBody className="p-0">
                {description && (
                    <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                    >
                        {description}
                    </Typography>
                )}
                {description && details ? (
                    <hr className="my-8 border-blue-gray-50" />
                ) : null}
                {details && (
                    <ul className="flex flex-col gap-4 p-0">
                        {Object.keys(details).map((el, key) => (
                            el !== "isDeleted" && (
                                <li key={key} className="flex items-center justify-between gap-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold capitalize"
                                    >
                                        {el}:
                                    </Typography>
                                    {editable ? (
                                        renderEditableField(el, details[el])
                                    ) : (
                                        <Typography
                                            variant="small"
                                            className="font-normal text-blue-gray-500"
                                        >
                                            {details[el] !== null && details[el] !== "N/A"
                                                ? el.toLowerCase().includes("date") || el.toLowerCase().includes("createdat")
                                                    ? new Date(details[el]).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'UTC'
                                                    }) + " UTC"
                                                    : details[el]
                                                : "N/A"}
                                        </Typography>
                                    )}
                                </li>
                            )
                        ))}
                    </ul>
                )}
                {editable && (
                    <Button onClick={handleSave} color="blue" className="mt-4">
                        Save
                    </Button>
                )}
            </CardBody>
        </Card>
    );
}

ProfileInfoCard.defaultProps = {
    action: null,
    description: null,
    details: {},
    editable: false,
    onSave: null,
};

ProfileInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    details: PropTypes.object,
    setDetails: PropTypes.func.isRequired,
    action: PropTypes.node,
    editable: PropTypes.bool,
    onSave: PropTypes.func,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
