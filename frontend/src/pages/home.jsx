import { useEffect, useState } from "react";
import ListingCard from "../components/listingCard";
import api from "../api/axios";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";
import { useLoading } from "../context/LoadingContext";

function Home() {
    const [listings, setListings] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem("token");
            let wishlist = [];
            setIsLoading(true);
            try {
                let url = "/listings";
                if (q) {
                    url = `/listings/search?q=${q}`
                }
                let res = await api.get(url);
                if (token) {
                    const wishlistRes = await api.get("/wishlist", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });

                    wishlist = wishlistRes.data
                }
                const updateListings = res.data.map((listing) => ({
                    ...listing, isWishlisted: wishlist.some((item) => item._id.toString() === listing._id.toString()
                    ),
                }))
                setListings(updateListings);

            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false);
            }

        };
        fetchData()
    }, [q])

    const filteredListings = selectedFilter === "all" ? listings : listings.filter(listing => listing.category === selectedFilter);

    return (
        <>
            <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <div className="container-fluid">
                <div className="container-lg">
                    <div className="row">
                        {filteredListings.map((listing) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={listing._id}>
                                <ListingCard listing={listing} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;