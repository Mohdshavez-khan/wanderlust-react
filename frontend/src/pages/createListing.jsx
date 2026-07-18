import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useLoading } from "../context/LoadingContext";

function createListing() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();

    const [listing, setListing] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",

    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setListing({
            ...listing,
            [name]: value

        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        Object.keys(listing).forEach((key) => {
            if (key !== "image") {
                formData.append(`listing[${key}]`, listing[key]);
            }
        });
        formData.append("image", image)
        try {
            let res = await api.post("/listings", formData);
            toast.success("Listing Created Successfully");
            navigate("/")
        } catch (err) {
            if (err.response?.status === 401) {
                alert("Please Login First")
                navigate("/login");
                return
            }
            toast.error((err.response?.data?.message || "somthing went wrong"))
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container py-4 py-md-5 px-3 px-sm-4">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-3 p-sm-4 p-md-5">
                            <h2 className="h3 fw-bold mb-3 mb-md-4 text-center text-md-start">Create New Listing</h2>
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate encType="multipart/form-data">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="title" className="form-label fw-semibold">Title</label>
                                        <input type="text" placeholder="Enter your title" className="form-control form-control-lg"
                                            name="title"
                                            value={listing.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="description" className="form-label fw-semibold">Description</label>
                                        <input type="text" placeholder="Enter your description" className="form-control form-control-lg"
                                            name="description"
                                            value={listing.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="image" className="form-label fw-semibold">Image</label>
                                        <input type="file" className="form-control form-control-lg"
                                            name="image"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            required
                                        />
                                        <div className="form-text">Upload a clear image for your listing.</div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="price" className="form-label fw-semibold">Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="number" placeholder="Enter your price" className="form-control form-control-lg"
                                                name="price"
                                                value={listing.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-8">
                                        <label htmlFor="country" className="form-label fw-semibold">Country</label>
                                        <input type="text" placeholder="Enter your country" className="form-control form-control-lg"
                                            name="country"
                                            value={listing.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="location" className="form-label fw-semibold">Location</label>
                                        <input type="text" placeholder="Enter your location" className="form-control form-control-lg"
                                            name="location"
                                            value={listing.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="category" className="form-label fw-semibold">Category</label>
                                        <select name="category" value={listing.category} onChange={handleChange} required>
                                            <option value="">Select Category</option>
                                            <option value="beach">Beach</option>
                                            <option value="mountain">Mountain</option>
                                            <option value="pool">Pool</option>
                                            <option value="camping">Camping</option>
                                            <option value="farm">Farm</option>
                                            <option value="room">Rooms</option>
                                            <option value="castle">Castle</option>
                                            <option value="villas">Villas</option>
                                            <option value="arctic">Arctic</option>
                                            <option value="island">Island</option>
                                            <option value="forest">Forest</option>
                                        </select>
                                    </div>

                                    <div className="col-12  mt-3">
                                        <button type="submit" className="btn btn-lg px-2 w-100  text-white" style={{ backgroundColor: '#fe246d' }}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default createListing;