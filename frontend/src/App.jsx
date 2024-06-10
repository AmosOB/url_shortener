import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        original_url: ''
    });
    const [shortenedUrl, setShortenedUrl] = useState(null);

    const shortenLink = (e) => {
        e.preventDefault();
        axios.post('/api/shorten', formData) // Adjusted the endpoint to match the Laravel route
        .then((res) => {
            setShortenedUrl(res.data.shortened_url);
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col">
                    <form onSubmit={shortenLink} className="d-flex">
                        <div className="form-floating mx-3">
                            <input
                                type="url"
                                name="original_url"
                                value={ formData.original_url }
                                onChange={ handleInputChange }
                                className="form-control form-control-lg"
                                id="original_url"
                                placeholder="Original URL"
                                autoComplete="off"
                                required
                            />
                            <label htmlFor="original_url">Original URL</label>
                        </div>
                        <button type="submit" className="btn btn-secondary">Shorten</button>
                    </form>
                    {shortenedUrl && (
                        <div className="mt-3">
                            <p>Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
