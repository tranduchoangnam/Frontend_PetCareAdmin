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
                            <li key={key} className="flex items-center justify-between gap-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold capitalize"
                                >
                                    {el}:
                                </Typography>
                                {editable ? (
                                    el === "medicine" ? (
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
                                                // color="blue"
                                                onClick={handleAddMedicine}
                                                className="mt-2"
                                            >
                                                + Add Medicine
                                            </Button>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                setDetails((prev) => ({
                                                    ...prev,
                                                    [el]: e.target.value,
                                                }));
                                            }}
                                            value={details[el] === "N/A" ? "" : details[el]}
                                            placeholder="Enter value"
                                            className="border border-blue-gray-200 p-1 rounded-md"
                                        />
                                    )
                                ) : (
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-500"
                                    >
                                        {details[el] !== null && details[el] !== "N/A"
                                            ? details[el]
                                            : "N/A"}
                                    </Typography>
                                )}
                            </li>
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
