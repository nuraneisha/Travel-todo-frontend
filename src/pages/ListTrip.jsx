import { getCountdown } from "../components/Countdown";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { deleteTrip } from "../features/todos/tripSlice";

export default function ListTrip({ trips, limit, onEdit, onDelete, showButton = true }) {
    //  If trips not passed as prop, get it from Redux
    const tripsFromRedux = useSelector((state) => state.trips) || [];
    const allTrips = trips ?? tripsFromRedux;
    // const dispatch = useDispatch();


    const sortedTrips = [...allTrips].sort((a, b) => new Date(a.date) - new Date(b.date));
    const limitedTrips = limit ? sortedTrips.slice(0, limit) : sortedTrips;
    const navigate = useNavigate();
    return (
        <>
            {showButton && (

                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="m-2 p-0">All Trips</h3>
                    <div className="d-flex gap-1">
                        <Button
                            className="me-4"
                            onClick={() => navigate("/addTrip")}
                            type="button"
                            variant="primary"
                        >
                            <i className="bi bi-plus-square "></i>
                        </Button>
                    </div>
                </div>
            )}

            <table
                className="m-2"
                border="1"
                cellPadding="8"
                cellSpacing={0}
                style={{ borderCollapse: "collapse", width: "97%" }}
            >
                <thead style={{ background: "#f0f0f0" }}>
                    <tr>
                        <th>Title</th>
                        <th>Days until the trip</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {limitedTrips.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No trips found.</td>
                        </tr>
                    ) : (
                        limitedTrips.map((trip) => (
                            <tr key={trip.id}>
                                <td>{trip.trip}</td>
                                <td>{getCountdown(trip.date)}</td>
                                <td>
                                    <div className="d-flex ms-4 align-items-center">
                                        <input type="checkbox" checked={trip.completed} readOnly />
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => onEdit(trip.id)}
                                            disabled={!onEdit}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDelete(trip.id)}
                                            disabled={!onDelete}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table >
        </>
    );
}
