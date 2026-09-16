function Stars({ value, onChange }) {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= value ? 'star filled' : 'star'}
            onClick={() => onChange(star)}
            role="button"
          >
            ★
          </span>
        ))}
      </div>
    );
  }
  
  export default Stars;