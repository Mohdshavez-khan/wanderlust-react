import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import api from "../api/axios"
import "./listingDetails.css";
import { toast } from "react-toastify";
import Map from "../components/Map";
import { useLoading } from "../context/LoadingContext";

function ListingDetail() {
    const navigat = useNavigate();
    const { id, reviewId } = useParams();
    const token = localStorage.getItem("token");
    const currUser = JSON.parse(localStorage.getItem("user"));
    const { setIsLoading } = useLoading();

    let [listing, setListing] = useState(null);

    const [review, setReviews] = useState({
        rating: 0,
        Comment: "",
    });

    useEffect(() => {
        fetchListing();

    }, []);

    const fetchListing = async () => {
        setIsLoading(true);
        try {
            let res = await api.get(`/listings/${id}`);
            setListing(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "somthing went wrong")
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await api.delete(`/listings/${id}/delete`);
            toast.success("Listing deleted Successfully")
            navigat("/")
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("token");
                toast.error("Please login first")
                navigat("/login")
                return;
            }
            if (err.response.status === 403) {
                return toast.error("you are not the owner of the listing")
            }
            toast.error(err.response?.data?.message || "somthing went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviews({
            ...review, [name]: value
        });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post(`/listings/${id}/reviews`, {
                review: {
                    rating: review.rating,
                    comment: review.comment
                }
            });
            toast.success("Review created success")
            fetchListing();
            setReviews({
                rating: "",
                comment: "",
            })
        } catch (err) {
            toast.error(err.response?.data?.message || "somthing went wrong")

        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        setIsLoading(true);
        try {
            let res = await api.delete(`/listings/${id}/reviews/${reviewId}`);
            toast.success("Review Deleted Successfully");
            fetchListing();
        } catch (err) {
            toast.error(err.response.data.message || "somthing went wrong")
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    };

    if (!listing) {
        return <h2>Loading...</h2>
    };

    const imageUrl = listing.image?.url?.startsWith("http") ? listing.image.url : `${import.meta.env.VITE_API_URL}/${listing.image.url.replace(/\\/g, "/")}`;

    return (
        <div className="container-fluid container-md py-4 py-md-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-12 col-lg-7 col-xl-7">
                    {/* Main Listing Card */}
                    <div className="card border-0 rounded-4 mb-4">
                        <div className="card-body p-3 p-sm-4 p-md-4">
                            <h2 className="h3 fw-bold mb-4">{listing.title}</h2>
                            <img src={imageUrl} alt={listing.title} className="w-100 rounded-8  listing-image" style={{ objectFit: 'cover' }} />
                            <p className="mb-2"><strong>Owned by</strong> <i className="ms-2">{listing?.owner?.username}</i></p>
                            <h4 className="text-danger fw-bold mb-3">&#8377;{listing.price.toLocaleString('en-IN')}/night</h4>
                            <p className="mb-2"><strong>Description:</strong> {listing.description}</p>
                            <p className="mb-2"><strong>Location:</strong> {listing.location}</p>
                            <p className="mb-4"><strong>Country:</strong> {listing.country}</p>
                            <p className="mb-4"><strong>Category:</strong> {listing.category}</p>

                            {currUser?.id === listing?.owner?._id && (
                                <div className="d-flex ms-0 flex-wrap mt-lg-2">
                                    <Link to={`/listings/${id}/edit`}><button className="btn btn-primary btn-sm">Edit</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add Review Section */}
                    {currUser && (
                        <div className="card border-0 rounded-4 mb-4">
                            <div className="card-body p-3 p-sm-4 p-md-4">
                                <h4 className="fw-bold mb-3">Add Review</h4>
                                <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Rating</label><br />
                                        <div className="star-input-group">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <i
                                                    key={star}
                                                    className={` fa-star ${star <= review.rating ? "fa-solid text-warning" : "fa-regular text-secondary"}`}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontSize: "24px"
                                                    }}
                                                    onClick={() => setReviews({ ...review, rating: star })}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="comment" className="form-label fw-semibold">Comment</label>
                                        <textarea className="form-control form-control-lg"
                                            name="comment"
                                            rows="3"
                                            value={review.comment}
                                            onChange={handleReviewChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button className="btn btn-lg w-100 text-white" style={{ backgroundColor: '#fe246d', borderColor: '#fe246d' }} type="submit">Add Review</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    {listing.reviews.length > 0 && (
                        <div className="mb-4">
                            <h4 className="fw-bold mb-3">All Reviews ({listing.reviews.length})</h4>
                            <div className="row g-3">
                                {listing?.reviews?.map((review) => (
                                    <div key={review._id} className="col-12 col-md-6">
                                        <div className="card border-1 shadow rounded-3 h-100">
                                            <div className="card-body p-3 p-md-4">
                                                <h6 className="fw-bold mb-2">@{review?.author?.username}</h6>
                                                <div className="star-rating mb-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <i
                                                            key={star}
                                                            className={` fa-star ${star <= review.rating ? "fa-solid text-warning" : "fa-regular text-secondary"}`}
                                                        ></i>
                                                    ))}
                                                </div>
                                                <p className="review-comment mb-0 p-2 rounded-2 fw-bold" style={{ backgroundColor: '#f8f9fa' }}>{review.comment}</p>
                                                <button className="btn btn-sm btn-outline-danger delete-review-btn mt-2" onClick={() => handleDeleteReview(review._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <hr></hr>
            {/* Map Section */}
            <div className="col-12 col-md-12 col-lg-10 col-xl-10 offset-xl-1 offset-lg-1">

                <h4 className="fw-bold" style={{ margin: "0 0 -1rem 1rem" }}>Where you'll be</h4>
                <p className="text-muted" style={{ margin: "1rem  0 0 1rem" }}>{listing.location}, {listing.country}</p>
                <div className="map-container">
                    {listing.geometry?.coordinates?.length === 2 ? <Map listing={listing} /> : <p className="text-muted p-3">Map data not available</p>}
                </div>
            </div>

        </div>
    )
}

export default ListingDetail;