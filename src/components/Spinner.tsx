function Spinner() {
    return (
        <div style={{ textAlign: 'center' }}>
            <div className="spinner" />
            <style>{`
                .spinner {
                    width: 24px;
                    height: 24px;
                    border: 3px solid #ccc;
                    border-top-color: #000;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin: auto;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Spinner;
