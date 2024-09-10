import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import { fetchGalleryImagesAsync } from '../../redux/gallerySlice';
import '../../styles/Gallery.css';

export default function Gallery() {
    const dispatch = useDispatch();
    const { images, status, error } = useSelector((state) => state.gallery);

    useEffect(() => {
        dispatch(fetchGalleryImagesAsync());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    return (
        <div className="gallery-page">
            <Banner title="GALLERY" />
            <section className="gallery-list">
                {images.map((image) => (
                    <div className="gallery-item" key={image.id}>
                        <img src={image.imageUrl} alt={image.title} className="gallery-image" />
                        {/* <div className="gallery-details">
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                        </div> */}
                    </div>
                ))}
            </section>
            <Footer />
        </div>
    )
}
